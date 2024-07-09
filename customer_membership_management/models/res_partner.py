# -*- coding: utf-8 -*-

from odoo import api, fields, models

from datetime import datetime, date
from dateutil.relativedelta import relativedelta


import logging

_logger = logging.getLogger(__name__)


class ResPartner(models.Model):
    _inherit = 'res.partner'

    is_membership_active = fields.Boolean(
        string='Membership Active',
        tracking=True,
        readonly=False,
        help="If this checkbox is ticked, it means that the user membership is active."
    )
    last_membership_purchase_date = fields.Date(string="Last Membership Purchase Date", tracking=True, readonly=True)
    membership_expiration_date = fields.Date(string="Membership Expiration Date", tracking=True, readonly=True)



    def _get_membership_purchase(self):
        # get products of memberships
        active_ids = self._context.get('active_ids', [])
        today = fields.Date.context_today(self)
        datetime_today = fields.Datetime.from_string(today)
        a_year_ago_date = datetime_today + relativedelta(days=-366)
        member_product_tmpl_ids = self.env['product.template'].search([('is_membership_product', '=', True)]).ids
        if not member_product_tmpl_ids:
            _logger.warning("No membership product found")
            return None
        member_product_product_ids = self.env['product.product'].search([('product_tmpl_id', 'in', member_product_tmpl_ids)]).ids
        # find purchases in POS lines
        for partner_id in active_ids:
            partner = self.env['res.partner'].browse(partner_id)
            pos_order_ids = self.env['pos.order'].sudo().search([('partner_id', '=', partner_id)]).ids
            pos_order_line_record = self.env['pos.order.line'].sudo().search([('order_id', 'in', pos_order_ids), ('product_id', 'in', member_product_product_ids)],
                           order="create_date desc, id desc", limit=1)
            res_partner_vals = {}
            if pos_order_line_record:
                if pos_order_line_record.order_id.date_order > a_year_ago_date:
                    res_partner_vals = {
                        'is_membership_active': True,
                        'last_membership_purchase_date': pos_order_line_record.order_id.date_order,
                        'membership_expiration_date': pos_order_line_record.order_id.date_order + relativedelta(days=366),
                    }
                else:
                    res_partner_vals = {
                        'is_membership_active': False,
                        'last_membership_purchase_date': pos_order_line_record.order_id.date_order,
                        'membership_expiration_date': pos_order_line_record.order_id.date_order + relativedelta(days=366),
                    }
            else:
                res_partner_vals = {
                    'is_membership_active': False,
                    'last_membership_purchase_date': None,
                    'membership_expiration_date': None,
                }

            partner.write(res_partner_vals)
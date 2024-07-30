# -*- coding: utf-8 -*-

from odoo import models, fields, api, _


class ResPartner(models.Model):
    _inherit = 'res.partner'
    membership_points = fields.Integer(
        string='Membership Points',
        tracking=True,
        readonly=True,
        help="This shows the points that the customer has accumulated",
    )


class PosSessionPartner(models.Model):
    _inherit = 'pos.session'

    def _loader_params_res_partner(self):
        res = super()._loader_params_res_partner()
        res.get("search_params").get("fields").append('membership_points')
        return res

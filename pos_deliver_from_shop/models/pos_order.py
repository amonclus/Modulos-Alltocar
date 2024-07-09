# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models, _



class PosOrderLine(models.Model):
    _inherit = 'pos.order.line'

    delivered_from_shop = fields.Boolean(string="Delivered From Shop", default=False)


    note_to_wh = fields.Char('Note to WH', required=False, copy=False)

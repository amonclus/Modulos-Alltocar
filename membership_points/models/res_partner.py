# -*- coding: utf-8 -*-

from odoo import api, fields, models


class ResPartner(models.Model):
    _inherit = 'res.partner'
    membership_points = fields.Integer(
        string='Membership Points',
        tracking=True,
        readonly=True,
        help="This shows the points that the customer has accumulated"
    )

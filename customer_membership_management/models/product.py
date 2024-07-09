# -*- coding: utf-8 -*-

from odoo import api, fields, models


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    is_membership_product = fields.Boolean(
        string='Membership Product',
        tracking=True,
        default=False,
        readonly=False,
        help="If this checkbox is ticked, it means that purchasing this product activate membership."
    )




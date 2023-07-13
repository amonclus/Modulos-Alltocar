# -*- coding: utf-8 -*-

from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class ProductOrder(models.Model):
    _inherit = "purchase.order"

    date_expected_port_arrival = fields.Datetime(
        string='Expected Port Arrival', copy=False, readonly=False, tracking=True,
        help="Expected date of arrival to destination port (for custom delivery).")

# -*- coding: utf-8 -*-
from odoo import _, api, fields, models
import random

class ResPartner(models.Model):
    _inherit = 'res.partner'

    membership_id = fields.Char(
        string='Membership Id',
        readonly=False,
        size=4,

    )
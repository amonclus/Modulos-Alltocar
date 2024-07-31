# -*- coding: utf-8 -*-
from odoo import _, api, fields, models
import random

class ResPartner(models.Model):
    _inherit = 'res.partner'

    membership_id = fields.Char(
        string='Membership Id',
        readonly=False,
        size=8,
    )


class PosSessionProduct(models.Model):
    _inherit = 'pos.session'

    def _loader_params_res_partner(self):
        res = super()._loader_params_res_partner()
        res.get("search_params").get("fields").append('membership_id')
        return res

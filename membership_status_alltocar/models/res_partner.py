# -*- coding: utf-8 -*-
from odoo import _, api, fields, models


class PosSessionPartner(models.Model):
    _inherit = 'pos.session'

    def _loader_params_res_partner(self):
        res = super()._loader_params_res_partner()
        res.get("search_params").get("fields").append('is_membership_active')
        return res
# -*- coding: utf-8 -*-
from odoo import _, api, fields, models


class PosSessionProduct(models.Model):
    _inherit = 'pos.session'

    def _loader_params_product_product(self):
        result = super()._loader_params_product_product()
        result['search_params']['fields'].append('is_membership_product')
        return result

    def _loader_params_res_partner(self):
        res = super()._loader_params_res_partner()
        res.get("search_params").get("fields").append('is_membership_active')
        return res

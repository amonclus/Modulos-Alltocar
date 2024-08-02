# -*- coding: utf-8 -*-
from odoo import _, api, fields, models
import random


class ResPartner(models.Model):
    _inherit = 'res.partner'

    membership_id = fields.Char(
        string='Membership Id',
        readonly=True,
        size=8,
    )

    _sql_constraints = [
        ('membership_id_unique', 'unique(membership_id)', 'The Membership ID must be unique.')
    ]

    @api.model
    def create(self, vals):
        if 'membership_id' not in vals or not vals['membership_id']:
            vals['membership_id'] = self._generate_membership_id()
        return super(ResPartner, self).create(vals)


    def _generate_membership_id(self):
        prefix = 'CL'
        suffix = ''.join(random.choices('0123456789ABCDEF', k=6))
        return prefix + suffix

    @api.model
    def generate_membership_ids(self, partner_ids):
        partners = self.browse(partner_ids)
        for partner in partners:
            if not partner.membership_id and partner.is_membership_active:
                partner.membership_id = partner._generate_membership_id()

class PosSessionProduct(models.Model):
    _inherit = 'pos.session'

    def _loader_params_res_partner(self):
        res = super()._loader_params_res_partner()
        res.get("search_params").get("fields").append('membership_id')
        return res

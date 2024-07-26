from odoo import http, fields
from datetime import datetime, timedelta

class GetMembershipController(http.Controller):
    @http.route('/get_membership_status', type='json', auth='public')
    def get_membership_status(self, partner_id):
        partner = http.request.env['res.partner'].browse(partner_id)
        if partner.exists():
            return {'membership_active': partner.is_membership_active}
        return {'error': 'Partner not found'}


class ChangeMembershipStatus(http.Controller):
    @http.route('/change_membership_status', type='json', auth='public')
    def change_membership_status(self, partner_id, membership):
        partner = http.request.env['res.partner'].browse(partner_id)
        if partner.exists():
            current_date = datetime.now().date()
            one_year = timedelta(days=366)  # Approximate 1 year as 365 days
            date_next_year = current_date + one_year

            partner.write({
                'is_membership_active': True,
                'last_membership_purchase_date': current_date,
                'membership_expiration_date': date_next_year
            })

            return {'partner': partner}
        return {'error': 'Partner not found'}

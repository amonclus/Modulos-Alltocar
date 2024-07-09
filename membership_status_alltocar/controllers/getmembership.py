from odoo import http


class getMembershipController(http.Controller):
    @http.route('/get_membership_status', type='json', auth='public')
    def get_membership_status(self, partner_id):
        partner = http.request.env['res.partner'].browse(partner_id)
        if partner.exists():
            return {'membership_active': partner.is_membership_active}
        return {'error': 'Partner not found'}

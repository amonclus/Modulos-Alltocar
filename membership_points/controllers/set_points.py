from odoo import http, fields
from datetime import datetime, timedelta


class SetPointsController(http.Controller):
    @http.route('/set_membership_points', type='json', auth='public')
    def set_membership_points(self, partner_id, points):
        partner = http.request.env['res.partner'].browse(partner_id)
        if partner.exists():
            newPoints = partner.membership_points + points
            partner.write({
                'membership_points': newPoints,

            })
            return {'new_points': newPoints}
        return {'error': 'Partner not found'}

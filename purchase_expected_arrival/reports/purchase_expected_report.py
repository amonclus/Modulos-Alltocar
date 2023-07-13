from odoo import api, fields, models

class PurchaseExpectedReport(models.AbstractModel):
    _name = 'report.purchase_expected_arrival.purchase_order_arrivals_lang'
    _description = 'Get the next port arrival reports as a PDF.'

    @api.model
    def _get_report_values(self, docids, data=None):
        start_date = self.env.context.get('start_date')
        end_date = self.env.context.get('end_date')
        docs = self.env['purchase.order'].search([('date_expected_port_arrival', '>=', start_date),
                                                        ('date_expected_port_arrival', '<=', end_date)])
        return {
            'doc_ids' : docids,
            'doc_model' : 'purchase.order',
            'data' : data,
            'docs' : docs,
        }
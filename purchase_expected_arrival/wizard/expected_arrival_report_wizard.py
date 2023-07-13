from odoo import fields, models
from odoo.exceptions import ValidationError


class ExpectedArrivalReportWizard(models.TransientModel):
    _name = 'wizard.expected_arrival_report'
    _description = 'Prints report of all expected port arrivals'

    start_date = fields.Date(string="Start Date", default=fields.Datetime.now)
    end_date = fields.Date(string="End Date")

    def action_print(self):
        if self.end_date < self.start_date:
            raise ValidationError('Enter End Date greater then Start Date')
        datas = {
            'ids': self._ids,
            'model': 'wizard.expected_arrival_report',
            'form': self.read()[0],
            'order_details': self.purchase_values()
        }
        return self.with_context(start_date=self.start_date, end_date=self.end_date).env.ref('purchase_expected_arrival.print_expected_arrivals_action').report_action(self.id, data=datas)

    def purchase_values(self):
        return self.env['purchase.order'].search([('date_expected_port_arrival', '>=', self.start_date),
                                                        ('date_expected_port_arrival', '<=', self.end_date)])

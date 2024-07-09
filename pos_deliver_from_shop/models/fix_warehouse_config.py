from odoo import api, fields, models, tools,_
import json
from odoo.exceptions import RedirectWarning, UserError, ValidationError ,Warning
from odoo.tools import float_is_zero, float_compare,format_datetime
from itertools import groupby



class PosStockSession(models.Model):
    _inherit ='pos.session'


    def _pos_data_process(self, loaded_data):
        wh_ids=[]
        if 'stock.location' in loaded_data:
            for rec in loaded_data['stock.location']:
                location_record = self.env['stock.location'].browse(rec['id'])
                wh_ids.append(location_record.warehouse_id.id)
            rec.update({'warehouse_id': wh_ids})
        super(PosStockSession,self)._pos_data_process(loaded_data)



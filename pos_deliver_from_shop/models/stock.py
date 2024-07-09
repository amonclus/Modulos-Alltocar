# -*- coding: utf-8 -*-

from odoo import fields, models, api, _
from odoo.exceptions import Warning, UserError, ValidationError
import random
from odoo.tools import float_is_zero
from datetime import date, datetime
import json
from itertools import groupby


class StockMove(models.Model):
	_inherit='stock.move'


	note_to_wh = fields.Char('Note to WH', required=False, copy=False)


class StockPicking(models.Model):
	_inherit='stock.picking'



	def _prepare_stock_move_vals(self, first_line, order_lines):
		res = super(StockPicking, self)._prepare_stock_move_vals(first_line, order_lines)

		all_notes = order_lines.mapped('note_to_wh')
		new_notes_str = ' '.join(filter(None, all_notes))
		res['note_to_wh'] = new_notes_str

		return res



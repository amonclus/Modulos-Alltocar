# -*- coding: utf-8 -*-
{
    'name': "purchase_expected_arrival",

    'summary': """
        Add field for expected arrival date of goods to port of arrival""",

    'description': """
        Add field for expected arrival date of goods to port of arrival
    """,

    "author": "Kayuulab SRL",
    "website": "http://www.kayuulab.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Purchase',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['purchase'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'wizard/expected_arrival_report_views.xml',
        'views/purchase_order_views.xml',
        'reports/purchase_expected_report_templates.xml',
        'reports/purchase_expected_report_views.xml',
    ],
}

# -*- coding: utf-8 -*-
{
    'name': "Alltogo Membership ID",

    'summary': """""",

    'description': """ 
    """,

    "author": "Álvaro Monclús",
    "website": "https://github.com/amonclus",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Alvaro',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'point_of_sale'],

    # always loaded
    'data': [
        'views/res_partner.xml'
    ],
    'assets':{
        'point_of_sale.assets': [
            'membership_id_reader/static/src/js/*.js',
            'membership_id_reader/static/src/xml/*.xml',
        ]
    }
}
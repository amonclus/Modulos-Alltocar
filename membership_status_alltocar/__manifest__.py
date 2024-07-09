# -*- coding: utf-8 -*-
{
    'name': "Alltogo Membership Status POS",

    'summary': """Module that obtains the information for the membership status of the active client""",

    'description': """ This module creates a field on top of the keypad widget in the POS module. This field displays the memberhsip status (active or inactive) for the 
    client currently purchasing certain products.
    """,

    "author": "Álvaro Monclús",
    "website": "https://github.com/amonclus",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Alvaro',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['point_of_sale', 'customer_membership_management'],

    # always loaded
    'data': [
    ],
    'assets':{
        'point_of_sale.assets': [
            'membership_status_alltocar/static/src/js/membership_status.js',
            'membership_status_alltocar/static/src/xml/membership_status.xml',
            'membership_status_alltocar/static/src/css/membership_status.css',
        ]
    }
}

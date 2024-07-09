# -*- coding: utf-8 -*-
{
    'name': "Customer Membership Management",

    'summary': """
        Check if a customer has bought the membership product in the last year, and update its
         membership status.""",

    'description': """
        Check if a customer has bought the membership product in the last year, and update its membership status.""",

    'author': "Kayuulab S.L.",
    'website': "https://www.kayuulab.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Sales/Sales',
    'version': '0.2.0',

    # any module necessary for this one to work correctly
    'depends': ['base', 'product'],

    # always loaded
    'data': [
        'security/membership_security_data.xml',
        'views/res_partner_views.xml',
        'views/product_views.xml',
    ],
    'license': 'OEEL-1',
}

# -*- coding: utf-8 -*-
{
    'name': "pos_deliver_from_shop",

    'summary': """
        Change behaviour of stock moves when location is not the shop, but the warehouse""",

    'description': """
        Change behaviour of stock moves when location is not the shop, but the warehouse
    """,

    'author': "Kayuulab S.L.",
    'website': "https://www.kayuulab.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Inventory/Inventory',
    'version': '0.3',

    # any module necessary for this one to work correctly
    'depends': ['base', 'stock', 'point_of_sale'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/point_of_sale_views.xml',
        'views/stock_picking_views.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            "pos_deliver_from_shop/static/src/js/models.js",
            "pos_deliver_from_shop/static/src/js/Screens/OrderlineFromShop.js",
            "pos_deliver_from_shop/static/src/js/Screens/ProductScreen/ControlButtons/OrderlineNoteToWHButton.js",
            "pos_deliver_from_shop/static/src/js/Screens/ProductScreen/ControlButtons/OrderlineNoteToWHButton.js",
            "pos_deliver_from_shop/static/src/js/Screens/TicketScreen/OrderlineDetails.js",
            'pos_deliver_from_shop/static/src/xml/Orderline.xml',
            'pos_deliver_from_shop/static/src/xml/OrderlineFromShop.xml',
            'pos_deliver_from_shop/static/src/xml/Screens/ProductScreen/ControlButtons/OrderlineNoteToWHButton.xml',
        ],
    },
    'license': 'OEEL-1',
}

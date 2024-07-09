odoo.define('pos_deliver_from_shop.Orderline', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');

    class Orderline extends PosComponent {

        get noteToWH() {
            return this.props.line.get_note_to_wh();
        }
    }
    Orderline.template = 'Orderline';

    Registries.Component.add(Orderline);

    return Orderline;
});

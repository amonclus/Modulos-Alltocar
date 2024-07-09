odoo.define('pos_deliver_from_shop.OrderlineDetails', function (require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');
    const { format } = require('web.field_utils');
    const { round_precision: round_pr } = require('web.utils');

    /**
     * @props {pos.order.line} line
     */
    class OrderlineDetails extends PosComponent {
        get noteToWH() {
            return this.props.line.get_note_to_wh();
        }
    }
    OrderlineDetails.template = 'OrderlineDetails';

    Registries.Component.add(OrderlineDetails);

    return OrderlineDetails;
});

odoo.define('pos_deliver_from_shop.OrderlineNoteToWHButton', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require("@web/core/utils/hooks");
    const Registries = require('point_of_sale.Registries');

    class OrderlineNoteToWHButton extends PosComponent {
        setup() {
            super.setup();
            useListener('click', this.onClick);
        }
        async onClick() {
            const selectedOrderline = this.env.pos.get_order().get_selected_orderline();
            if (!selectedOrderline) return;

            const { confirmed, payload: inputNote } = await this.showPopup('TextAreaPopup', {
                startingValue: selectedOrderline.get_note_to_wh(),
                title: this.env._t('Add Note to WH'),
            });

            if (confirmed) {
                console.log(this.env.pos.pos_order_line,'this.env.pos.pos_order_line')
                selectedOrderline.set_note_to_wh(inputNote);
            }
        }
    }
    OrderlineNoteToWHButton.template = 'OrderlineNoteToWHButton';

    ProductScreen.addControlButton({
        component: OrderlineNoteToWHButton,
        condition: function () {
            return this.env.pos;
        }
    });

    Registries.Component.add(OrderlineNoteToWHButton);

    return OrderlineNoteToWHButton;
});

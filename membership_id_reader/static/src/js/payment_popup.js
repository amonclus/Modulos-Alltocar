/** @odoo-module **/

import ProductScreen from 'point_of_sale.ProductScreen';
import Registries from 'point_of_sale.Registries';

const PaymentIdCheck = (ProductScreen) => class extends ProductScreen {

        setup() {
            super.setup()
        }
        async _onClickPay() {
            super._onClickPay()
            console.log("Hola")
            await this.showPopup('MessagePopup')
        }
    };

Registries.Component.extend(ProductScreen, PaymentIdCheck);
return ProductScreen
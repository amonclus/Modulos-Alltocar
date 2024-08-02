/** @odoo-module **/

import ProductScreen from 'point_of_sale.ProductScreen';
import Registries from 'point_of_sale.Registries';
const BarcodeScanner = require('@web/webclient/barcode/barcode_scanner');

const PaymentIdCheck = (ProductScreen) => class extends ProductScreen {
        setup() {
            super.setup()
            let data;
        }
        async _onClickPay() {
            const order = this.env.pos.get_order()
            const partner = order.get_partner()
            if(partner && partner.is_membership_active && partner.membership_id) {
                await this.open_mobile_scanner()

                if(String(this.data) == partner.membership_id) {
                     super._onClickPay()
                }
            }
            else {
                super._onClickPay()
            }
        }

        async open_mobile_scanner() {
            try {
                this.data = await BarcodeScanner.scanBarcode();
            } catch (error) {
                if (error.error && error.error.message) {
                    // Here, we know the structure of the error raised by BarcodeScanner.
                    this.showPopup('ErrorPopup', {
                        title: this.env._t('Unable to scan'),
                        body: 'Incorrect Id',
                    });
                    return;
                }
                // Just raise the other errors.
                throw error;
            }
            if (this.data) {
                this.env.barcode_reader.scan(this.data);
                if ('vibrate' in window.navigator) {
                    window.navigator.vibrate(100);
                }
            } else {
                this.env.services.notification.notify({
                    type: 'warning',
                    message: 'Please, Scan again !',
                });
            }
        }
    };

Registries.Component.extend(ProductScreen, PaymentIdCheck);
return ProductScreen
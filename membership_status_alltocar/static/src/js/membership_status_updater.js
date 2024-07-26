/** @odoo-module */

import Registries from "point_of_sale.Registries"
import ProductScreen from "point_of_sale.ProductScreen"

const ProductScreenInherit = (product_screen) => class extends product_screen {
    setup() {
        super.setup();
    }

    async onClickPartner() {
        const currentPartner = this.currentOrder.get_partner();
        if (currentPartner && this.currentOrder.getHasRefundLines()) {
            this.showPopup('ErrorPopup', {
                title: this.env._t("Can't change customer"),
                body: _.str.sprintf(
                    this.env._t(
                        "This order already has refund lines for %s. We can't change the customer associated to it. Create a new order for the new customer."
                    ),
                    currentPartner.name
                ),
            });
            return;
        }
        const { confirmed, payload: newPartner } = await this.showTempScreen('PartnerListScreen', { partner: currentPartner });
        if (confirmed) {
            this.currentOrder.set_partner(newPartner);
            this.env.posbus.trigger('update-membership-status');
            this.isThereProduct();
        }
    }

    isThereProduct() {
        const orderProducts = this.currentOrder.get_orderlines();
        const membershipProductNames = this.state.membershipProducts;
        for (const product of orderProducts) {
            if (product.product.is_membership_product) {
                this.env.posbus.trigger('set-member-list');
                break
            }
        }
    }

    async _addProduct(product, options) {
        super._addProduct(product, options);
        if (product.is_membership_product) {
            this.env.posbus.trigger('set-member-list');
        }
    }

    async _updateSelectedOrderline(event) {
        super._updateSelectedOrderline(event);
        const orderLine = this.currentOrder.get_selected_orderline();
        if (orderLine && orderLine.product.is_membership_product) {
            this.env.posbus.trigger('remove-member-list');
        }
    }
};

Registries.Component.extend(ProductScreen, ProductScreenInherit);
return ProductScreen;
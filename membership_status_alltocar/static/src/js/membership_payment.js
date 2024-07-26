/** @odoo-module */

import Registries  from 'point_of_sale.Registries'
import PaymentScreen from 'point_of_sale.PaymentScreen'

const MembershipPayment = (PaymentScreen) => class extends PaymentScreen {
    setup() {
        super.setup()
    }

    async validateOrder(isForceValidate){
        super.validateOrder()
        let orderProducts = this.currentOrder.get_orderlines()
        for (let i = 0; i < orderProducts.length; i++) {
            if (orderProducts[i].product.is_membership_product) {
                this.modifyMembership();
                this.currentOrder.partner.is_membership_active = true
                this.env.posbus.trigger('set-initial-points');
                break;
            }
        }
    }

    async modifyMembership() {
        try {
            const result = await this.rpc({
                route: '/change_membership_status',                //http route to python script that makes the db request
                params: {'partner_id': this.currentOrder.get_partner().id,
                    'membership': true,
                }
            });
            if (result.error) {
                this.state.error = result.error
            }
        } catch (error) {
            this.state.error = 'Failed to fetch membership status'
        }
    }

};
Registries.Component.extend(PaymentScreen, MembershipPayment)
return PaymentScreen
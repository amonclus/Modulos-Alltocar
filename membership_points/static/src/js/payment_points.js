/** @odoo-module */

import Registries  from 'point_of_sale.Registries'
import PaymentScreen from 'point_of_sale.PaymentScreen'
import {useBus} from "@web/core/utils/hooks";

const MembershipPaymentPoints = (PaymentScreen) => class extends PaymentScreen {
    setup() {
        super.setup()
        useBus(this.env.posbus, 'set-initial-points', this.setPoints);
    }

    async validateOrder(isForceValidate){
        super.validateOrder()
        if(this.currentOrder.get_partner().is_membership_active) this.setPoints()
    }

    async setPoints() {
        try {
            const result = await this.rpc({
                route: '/set_membership_points',                //http route to python script that makes the db request
                params: {'partner_id': this.currentOrder.get_partner().id,
                    'points': 10,
                }
            });
            if (result.error) {
                this.state.error = result.error
            }
        } catch (error) {
            this.state.error = 'Failed to update points'
        }
    }

};
Registries.Component.extend(PaymentScreen, MembershipPaymentPoints)
return PaymentScreen
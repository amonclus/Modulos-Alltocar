/** @odoo-module */

import Registries  from 'point_of_sale.Registries'
import PaymentScreen from 'point_of_sale.PaymentScreen'
import {useBus} from "@web/core/utils/hooks";

const MembershipPaymentPoints = (PaymentScreen) => class extends PaymentScreen {
    setup() {
        super.setup()
        let points = 0
        useBus(this.env.posbus, 'set-initial-points', this.setPoints);
    }

    async validateOrder(isForceValidate){
        super.validateOrder()
        const price = this.currentOrder.get_total_with_tax() + this.currentOrder.get_rounding_applied()
        if(this.currentOrder.get_partner().is_membership_active && price >= 5) {
            this.points = Math.round(price*0.2)
            this.setPoints()
        }
    }

    async setPoints() {
        try {
            const result = await this.rpc({
                route: '/set_membership_points',                //http route to python script that makes the db request
                params: {'partner_id': this.currentOrder.get_partner().id,
                    'points': this.points,
                }
            });
            if (result.error) {
                console.log("Error")
            }
        } catch (error) {
            console.log('Failed to update points')
        }
        this.currentOrder.get_partner().membership_points += this.points

    }

    applyPoints() {
        this.points = -this.currentOrder.get_partner().membership_points
        const orderLines = this.currentOrder.get_orderlines()
        let discount = Math.min(this.currentOrder.get_partner().membership_points * 0.5, 45)
        if(discount > 45) discount = 45
        for(let i = 0; i < orderLines.length; i++) {
            orderLines[i].set_discount(discount)
        }

        this.setPoints()

    }

};
Registries.Component.extend(PaymentScreen, MembershipPaymentPoints)
return PaymentScreen
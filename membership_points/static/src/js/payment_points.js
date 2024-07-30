/** @odoo-module */

import Registries  from 'point_of_sale.Registries'
import PaymentScreen from 'point_of_sale.PaymentScreen'
import {useBus} from "@web/core/utils/hooks";
import { useState } from "@odoo/owl";

const MembershipPaymentPoints = (PaymentScreen) => class extends PaymentScreen {
    setup() {
        super.setup()
        this.state = useState({showUndo: false, points: 0});
        useBus(this.env.posbus, 'set-initial-points', this.setPoints);
    }

    async validateOrder(isForceValidate){
        super.validateOrder()
        const price = this.currentOrder.get_total_with_tax() + this.currentOrder.get_rounding_applied()
        if(this.currentOrder.get_partner().is_membership_active && price >= 5) {
            this.state.points = Math.round(price*0.2)
            this.setPoints()
        }
    }

    async setPoints() {
        try {
            const result = await this.rpc({
                route: '/set_membership_points',                //http route to python script that makes the db request
                params: {'partner_id': this.currentOrder.get_partner().id,
                    'points': this.state.points,
                }
            });
            if (result.error) {
                console.log("Error")
            }
        } catch (error) {
            console.log('Failed to update points')
        }
        this.currentOrder.get_partner().membership_points += this.state.points
    }

    applyPoints() {
        this.state.points = -this.currentOrder.get_partner().membership_points
        if(this.state.points != 0) {
            let discount = Math.min(this.currentOrder.get_partner().membership_points * 0.5, 45)
            this.setDiscount(discount)

            this.setPoints()
            this.state.showUndo = true
        }
    }

    setDiscount(disc) {
        const orderLines = this.currentOrder.get_orderlines()
        if(disc > 45) disc = 45
        for(let i = 0; i < orderLines.length; i++) {
            orderLines[i].set_discount(disc)
        }
    }

    clickUndo() {
        this.state.showUndo = false
        this.state.points *=  -1
        this.setPoints()
        let discount = -Math.min(this.currentOrder.get_partner().membership_points * 0.5, 45)
        this.setDiscount(discount)
    }

};
Registries.Component.extend(PaymentScreen, MembershipPaymentPoints)
return PaymentScreen

odoo.define("membership_status.MembershipStatus", function(require){
    "use strict";
        const {useState} = require("@odoo/owl")
        const PosComponent = require("point_of_sale.PosComponent");
        const ProductScreen = require("point_of_sale.ProductScreen");
        const Registries = require("point_of_sale.Registries");
        const {useListener} = require("@web/core/utils/hooks");

        class MembershipStatus extends PosComponent {
            setup() {
                super.setup();
                this.state = useState({ membershipActive: null, error: null, partnerId:null, partnerSelected: false })

                //We get the current order, its client and their id
                const order = this.env.pos.get_order()
                const partner = order.get_partner()
                if(partner != null) {
                    this.state.partnerSelected = true;
                    this.state.partnerId = partner.id
                    this.fetchMembershipStatus()
                }

            }

            //Makes an rpc call to the backend server and obtains the membership status for the parameter partnerId
            async fetchMembershipStatus() {
                try {
                    const result = await this.rpc({
                        route: '/get_membership_status',                //http route to python script that makes the db request
                        params: {
                            'partner_id': this.state.partnerId
                        }
                    });
                    if (result.error) {
                        this.state.error = result.error
                    } else {
                        this.state.membershipActive = result.membership_active
                    }
                } catch (error) {
                    this.state.error = 'Failed to fetch membership status'
                }
            }

            get isActive() {
                return !!this.state.membershipActive;
            }

            get isPartnerSelected() {
                return this.state.partnerSelected
            }
        }

        MembershipStatus.template = "owl.MembershipStatus"

        ProductScreen.addControlButton({
            component: MembershipStatus,
            position: ["before" , "SetSaleOrderButton"],
        });

        Registries.Component.add(MembershipStatus)
    
        return MembershipStatus
    });


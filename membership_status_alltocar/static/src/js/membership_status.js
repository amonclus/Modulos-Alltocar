odoo.define("membership_status.MembershipStatus", function(require) {
    "use strict";
    const { useState } = require("@odoo/owl");
    const PosComponent = require("point_of_sale.PosComponent");
    const ProductScreen = require("point_of_sale.ProductScreen");
    const Registries = require("point_of_sale.Registries");
    const { useBus } = require("@web/core/utils/hooks");
    const { isConnectionError } = require('point_of_sale.utils');

    class MembershipStatus extends PosComponent {
        setup() {
            super.setup();
            useBus(this.env.posbus, 'update-membership-status', this.updateButton);
            useBus(this.env.posbus, 'set-member-list', this.setMemberList);
            useBus(this.env.posbus, 'remove-member-list', this.removeMemberList);

            this.state = useState({
                membershipActive: null,
                error: null,
                order: null,
                partner: null,
                partnerSelected: false,
                membershipChange: null,
            });

            this.initOrder();
            this.updateButton();
        }

        initOrder() {
            this.state.order = this.env.pos.get_order();
            this.state.partner = this.state.order.get_partner();
        }

        //Used to check if button should be displayed or not (xml file)
        get isPartnerSelected() {
            return this.state.partnerSelected && !this.state.error;
        }

        updateButton() {
            this.initOrder();
            this.getinfo();
            this.updatePricelist();
        }

        async handleError() {
            await this.showPopup('OfflineErrorPopup', {
                title: this.env._t('Offline'),
                body: this.env._t('Unable to save changes.'),
            });
        }

        getinfo() {
            this.state.partnerSelected = !!this.state.partner;
            if (this.state.partnerSelected) {
                this.fetchMembershipStatus();
            }
        }

        //Accesses the server to check for the status of the client
        async fetchMembershipStatus() {
            try {
                const result = await this.rpc({
                    route: '/get_membership_status',
                    params: { 'partner_id': this.state.partner.id }
                });
                if (result.error) {
                    this.state.error = result.error;
                } else {
                    this.state.membershipActive = result.membership_active;
                }
            } catch (error) {
                this.state.error = 'Failed to fetch membership status';
                if (isConnectionError(error)) {
                    this.handleError();
                } else {
                    throw error;
                }
            }
        }

        updatePricelist() {
            const listName = this.state.partner && this.state.partner.is_membership_active ? "Membership Pricelist" : "Retail Non-Member Pricelist";
            this.setList(listName);
        }

        //Sets the pricelist passed as a parameter
        setList(list) {
            const priceList = this.env.pos.pricelists.find(pricelist => pricelist.name === list);
            if (priceList) {
                this.state.order.set_pricelist(priceList);
            }
        }

        //Sets the Non-Members pricelist for those clients that don't have an active membership
        removeMemberList() {
            if (!this.state.partner || !this.state.partner.is_membership_active) {
                this.setList("Retail Non-Member Pricelist");
            }
        }

        //Used from other files using a bus
        setMemberList() {
            this.setList("Membership Pricelist");
        }
    }

    MembershipStatus.template = "owl.MembershipStatus";

    ProductScreen.addControlButton({
        component: MembershipStatus,
        position: ["before", "GiftCouponButton"],
    });

    Registries.Component.add(MembershipStatus);
    return MembershipStatus;
});



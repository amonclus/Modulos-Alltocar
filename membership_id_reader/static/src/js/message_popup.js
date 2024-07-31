odoo.define('point_of_sale.MessagePopup', function (require){
    'use strict';

    const Registries = require('point_of_sale.Registries');
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const { useState, useRef, onMounted } = owl;

    class MessagePopup extends AbstractAwaitablePopup {
        setup(){
            super.setup()
            this.state = useState({text_value: ''})
            this.txtRef = useRef('text-value')

            onMounted(()=>this.txtRef.el.focus())
        }

        confirm(){
            const partner = this.env.pos.get_order().get_partner()
            const isValid = /^\d{4}$/.test(this.state.text_value);

             if (!isValid) {
                alert("Please enter a valid 4-digit number.");
                this.txtRef.el.focus();
                return;
            }
            else if(partner.membership_id != this.state.text_value) {
                 alert("Incorrect id, please try again");
                this.txtRef.el.focus();
                return;
            }
            else super.confirm()
        }

        cancel(){
            this.showScreen('ProductScreen')
            super.cancel()
        }

        getPayload(){
            return this.state.text_value;
        }
    }

    MessagePopup.template = 'MessagePopup';
    Registries.Component.add(MessagePopup)

    return MessagePopup
})
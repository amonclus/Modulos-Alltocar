odoo.define('pos_deliver_from_shop.models', function (require) {
"use strict";

const { PosGlobalState, Order, Orderline, Payment } = require('point_of_sale.models');
const Registries = require('point_of_sale.Registries');
const core = require('web.core');
const { batched } = require('point_of_sale.utils')
const QWeb = core.qweb;

const TIMEOUT = 7500;

var _t = core._t;


const PosWHStockOrderline = (Orderline) => class PosWHStockOrderline extends Orderline {
    constructor(obj, options) {
        super(...arguments);
        this.delivered_from_shop =  false;
        this.note_to_wh = this.note_to_wh || "";
    }
    export_as_JSON(){
        const json = super.export_as_JSON(...arguments);
        json.delivered_from_shop = this.delivered_from_shop;
        json.note_to_wh = this.get_note_to_wh();
        return json;
    }
    //@override
    init_from_JSON(json){
        super.init_from_JSON(...arguments);
        this.delivered_from_shop = json.delivered_from_shop;
        this.set_note_to_wh(json.note_to_wh);
    }
    set_note_to_wh(note) {
        this.note_to_wh = note || '';
    }
    get_note_to_wh() {
        return this.note_to_wh;
    }


    set_delivered_from_shop(delivered_from_shop){
        this.delivered_from_shop = delivered_from_shop;
    }
    get_delivered_from_shop(){
        return this.delivered_from_shop;
    }
    get_delivered_from_shop_str(){
        if (this.delivered_from_shop) {
            return _t("ALL FROM SHOP");
        } else {
            return _t("NOT ALL FROM SHOP");
        }
    }
    toggle_from_shop(){
        this.delivered_from_shop = !this.delivered_from_shop;
        return this.delivered_from_shop;
    }
}
Registries.Model.extend(Orderline, PosWHStockOrderline);


});

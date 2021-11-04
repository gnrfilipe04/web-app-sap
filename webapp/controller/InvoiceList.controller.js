sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/GroupHeaderListItem"
], function (
	Controller,
	JSONModel,
	formatter,
	Filter,
	FilterOperator,
	Sorter,
	GroupHeaderListItem
	) {

	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
		formatter: formatter,

		onInit : function () {

			var oViewModel = new JSONModel({
				currency: "EUR"
			});

			this.getView().setModel(oViewModel, "view");
		},
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			});
		},
		onFilterInvoices : function (oEvent) {

			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ShipCity", FilterOperator.Contains, sQuery));
			}

			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onSorter(oContext){

			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");

			oBinding.sort( new Sorter({  path: 'ShipCountry', descending: false, group: function(oContext){
				return oContext.getProperty('ShipCountry');
			}}))
		},
		onSorterOrder(){
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");

			oBinding.sort( new Sorter({  path: 'OrderID', descending: true}))
		}
	});
});

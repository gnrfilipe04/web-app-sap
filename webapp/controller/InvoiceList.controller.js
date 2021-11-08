sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/ui/core/Fragment"
], function (
	Controller,
	JSONModel,
	formatter,
	Filter,
	FilterOperator,
	Sorter,
	Fragment
	) {

	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
		formatter: formatter,

		onInit() {

			var oViewModel = new JSONModel({
				currency: "EUR"
			});

			this.getView().setModel(oViewModel, "view");
		},
		onPress(oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			});
		},
		onFilterInvoices(oEvent) {

			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ShipCity", FilterOperator.Contains, sQuery));
			}

			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onOpenDialog(){
			if (!this.pDialog) this.pDialog = this.loadFragment({ name: "sap.ui.demo.walkthrough.view.FilterDialog"});

			this.pDialog.then((oDialog) => oDialog.open());
		},
		onCloseDialog() {
			this.byId("filterDialog").close();
		},
		// shows selected filters
		handleConfirm: function (oEvent) {

			const oList = this.byId("invoiceList");
			const oBinding = oList.getBinding("items");

			//Filter

			const aFilter = [];
			const regionExists = oEvent.getParameters().filterKeys.region
			oEvent.getParameters().filterKeys && aFilter.push(new Filter(
				"ShipRegion",
				regionExists ? FilterOperator.Contains : FilterOperator.NotContains,
				''));

			oBinding.filter(aFilter);

			//Order
			oEvent.getParameters().groupItem && oBinding.sort( new Sorter(
				{
					path: oEvent.getParameters().groupItem.mProperties.key,
					descending: oEvent.getParameters().groupDescending,
					group: (oContext) => oContext.getProperty(
						oEvent.getParameters().groupItem.mProperties.key
					)
			}))
		}
	});
});

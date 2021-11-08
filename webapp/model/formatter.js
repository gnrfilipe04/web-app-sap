sap.ui.define([], function () {
	"use strict";

	function getTimestamp(date){
		return Number(date.split('/Date(')[1].split(')/')[0])
	}

	return {
		dateFormat(date) {
			const dateNumber =  getTimestamp(date)
			return new Date(dateNumber).toLocaleDateString()

		},
		statusText(requiredDate, shippedDate) {
			let required = getTimestamp(requiredDate)
			let shipped = getTimestamp(shippedDate)
			if(shipped <= required){
				this.byId('statusOrder').setState('Success')
				return 'In Time'
			}else{
				this.byId('statusOrder').setState('Error')
				return 'Too Late'
			}

		},
	};
});

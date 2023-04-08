export const format = (dateToFormatTimeMillis, systemDateTimeMillis) => {
	const pad = (dayOrMonth) => {
		if (dayOrMonth >= 10) {
			return dayOrMonth;
		} else {
			return '0' + dayOrMonth;
		}
	};
	
	if (typeof(dateToFormatTimeMillis) != "number" ||
		typeof(systemDateTimeMillis) != "number" ||
		dateToFormatTimeMillis < -8640000000000000 ||
		dateToFormatTimeMillis > 8640000000000000 ||
		systemDateTimeMillis < -8640000000000000 ||
		systemDateTimeMillis > 8640000000000000
		) {
		console.log('invalid input parameters: \'' + dateToFormatTimeMillis + '\', \'' + systemDateTimeMillis + '\'');
		return '';
	}
	
	const dateToFormat = new Date(dateToFormatTimeMillis);
	const systemDate = new Date(systemDateTimeMillis);
	
	const dd = dateToFormat.getDate();
	const dm = dateToFormat.getMonth() + 1;
	const dy = dateToFormat.getFullYear();
	
	const sd = systemDate.getDate();
	const sm = systemDate.getMonth() + 1;
	const sy = systemDate.getFullYear();
	
	if (dd === sd && dm === sm && dy === sy) {
		return 'TODAY';
	} else {
		return pad(dd) + '/' + pad(dm) + '/' + dy;
	}
};

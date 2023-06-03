function timeTransformerToDate(inputDate: number) {
	const timeValue = new Date(inputDate + 32400000);

	return `${timeValue.getFullYear()}.${
		timeValue.getMonth() + 1
	}.${timeValue.getDate()}.${timeValue.getHours()}.${timeValue.getMinutes()}`;
}

export default timeTransformerToDate;

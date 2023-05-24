export function convertDate(serverMills: number): string {
	const TIME_DIFFERENCE = new Date().getTimezoneOffset() * 60;
	const SECOND_RANGE = 60;
	const MINUTE_RANGE = SECOND_RANGE * 60;
	const HOUR_RANGE = MINUTE_RANGE * 24;
	const DAY_RANGE = HOUR_RANGE * 7;
	const WEEK_RANGE = DAY_RANGE * 4;
	const MONTH_RANGE = WEEK_RANGE * 52;

	let timeGap = Math.floor((Date.now() - serverMills) / 1000) + TIME_DIFFERENCE;

	let result = '';

	if (timeGap < SECOND_RANGE) {
		result = `${timeGap}초 전`;
	} else if (timeGap >= SECOND_RANGE && timeGap < MINUTE_RANGE) {
		result = `${Math.floor(timeGap / SECOND_RANGE)}분 전`;
	} else if (timeGap >= MINUTE_RANGE && timeGap < HOUR_RANGE) {
		result = `${Math.floor(timeGap / MINUTE_RANGE)}시간 전`;
	} else if (timeGap >= HOUR_RANGE && timeGap < DAY_RANGE) {
		result = `${Math.floor(timeGap / HOUR_RANGE)}일 전`;
	} else if (timeGap >= DAY_RANGE && timeGap < WEEK_RANGE) {
		result = `${Math.floor(timeGap / DAY_RANGE)}주 전`;
	} else if (timeGap >= WEEK_RANGE && timeGap < MONTH_RANGE) {
		result = `${Math.floor(timeGap / WEEK_RANGE)}개월 전`;
	} else {
		result = `${Math.floor(timeGap / MONTH_RANGE)}년 전`;
	}

	return result;
}

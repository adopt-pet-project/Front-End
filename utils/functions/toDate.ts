export function toDate(serverMills: number): string {
	const TIME_DIFFERENCE = 32400000;
	let date = new Date(serverMills + TIME_DIFFERENCE);
	let result = `${date.getFullYear()}.${(date.getMonth() + 1)
		.toString()
		.padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date
		.getHours()
		.toString()
		.padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

	return result;
}

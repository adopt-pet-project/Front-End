interface Chat {
	id: string;
	chatRoomNo: number;
	senderNo: number;
	senderName: string;
	type: number | null;
	content: string;
	sendDate?: number;
	sendTime?: number;
	dateString?: string;
	timeString?: string;
	readCount: number;
	mine: boolean;
}

interface FlightChat {
	type: number | null;
	content: string;
}

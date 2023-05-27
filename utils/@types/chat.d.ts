interface Chat {
	id: string;
	chatRoomNo: number;
	senderNo: number;
	senderName: string;
	type: number | null;
	content: string;
	sendDate: number;
	readCount: number;
	mine: boolean;
}

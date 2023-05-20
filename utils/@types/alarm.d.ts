interface Alarmdata {
	id: number;
	type: 'announcement' | 'documentHot' | 'comment' | 'recomment' | 'mention';
	date: string;
	contents: string;
}

interface Notedata {
	id: number;
	name: string;
	contents: string;
	date: string;
}

interface Chatdata {
	chatId: number;
	docId: number;
	name: string;
	docTitle: string;
	content: string;
	date: string;
	stack: number;
}

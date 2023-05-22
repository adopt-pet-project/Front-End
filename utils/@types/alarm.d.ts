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

interface chatLogStringData {
	id: number;
	type: 'text' | 'image';
	chatContents: string;
	date: string;
	checked: boolean;
	isMy: boolean;
}

interface chatLogLocationData {
	id: number;
	type: 'location';
	chatContents: {
		x: string;
		y: string;
	};
	date: string;
	checked: boolean;
	isMy: boolean;
}

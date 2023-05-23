interface Alarmdata {
	id: number;
	type: 'announcement' | 'documentHot' | 'comment' | 'recomment' | 'mention';
	date: string;
	contents: string;
	checked: boolean;
	del: boolean;
}

interface Alarmnotedata extends Alarmdata {
	type: 'note';
	name: string;
}

interface Alarmchatdata extends Alarmdata {
	type: 'chat';
	name: string;
}

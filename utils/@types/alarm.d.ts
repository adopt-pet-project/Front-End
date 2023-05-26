interface Alarmdata {
	id: number;
	type: 'announcement' | 'documentHot';
	refid: number;
	date: string;
	contents: string;
	checked: boolean;
	del: boolean;
}

interface Alarmdataname extends Alarmdata {
	type: 'comment' | 'recomment' | 'chat' | 'note';
	name: string;
}

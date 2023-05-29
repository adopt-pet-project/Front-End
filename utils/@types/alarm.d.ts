interface Alarmdata {
	id: number;
	type: 'announcement' | 'documentHot';
	url: number;
	publishedAt: number[];
	content: string;
	checked: boolean;
	del: boolean;
}

interface Alarmdataname extends Alarmdata {
	type: 'comment' | 'recomment' | 'chat' | 'note';
	name: string;
}

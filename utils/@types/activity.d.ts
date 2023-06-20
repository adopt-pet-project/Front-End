interface Activitydoc {
	id: number;
	title: string;
	contents: string;
	publishedAt: string;
	thumbnail: string;
	views: number;
	comment: number;
	like: number;
}

interface Activitycomment {
	id: number;
	refId: number;
	title: string;
	contents: string;
	publishedAt: string;
}

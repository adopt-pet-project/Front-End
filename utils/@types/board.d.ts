interface Board {
	title: string;
	thumbnail: string;
	id: number;
	context: string;
	author: string;
	view: number;
	comment: number;
	like: number;
	publishedAt: string;
}

interface BoardHeader {
	title: string;
	authorId: number;
	username: string;
	profile: string;
	view: number;
	like: number;
	comment: number;
	publishedAt: string;
}

interface BoardContext {
	context: string;
	imageList: ImageUploadResponse1[];
}

interface BoardDetail {
	id: number;
	mine: boolean;
	header: BoardHeader;
	context: BoardContext;
}

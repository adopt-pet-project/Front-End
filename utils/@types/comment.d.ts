interface CommentTarget {
	commentId: number;
	authorId: number;
	author: string;
	modify: boolean;
}

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

interface BoardFirstPage {
	hot: Board;
	weekly: Board;
	list: Board[];
}

interface CommentTarget {
	commentId: number;
	authorId: number;
	author: string;
	modify: boolean;
}

interface Comment {
	type: number;
	mine: boolean;
	id: number;
	author: string;
	authorId: number;
	context: string;
	profile: string;
	publishedAt: string;
	like: number;
	deleteStatus: number;
	blindStatus: number;
	comments: Comment[];
}

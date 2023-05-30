import {toDate} from '@/utils/functions/toDate';
import styles from '@/styles/components/board/comments.module.scss';
import useRefreshToken from '@/utils/hooks/useRefreshToken';

export default function Comments({
	parentId,
	commentList,
	setTarget,
	setInputValue,
	deleteComment,
	setCommentList,
	entireCommentList,
}: {
	parentId: number | null;
	commentList: Comment[];
	setTarget: Function;
	setInputValue: Function;
	deleteComment: Function;
	setCommentList: Function;
	entireCommentList?: Comment[];
}) {
	const refresh = useRefreshToken();

	function setCommentTarget(
		commentId: number,
		authorId: number,
		author: string,
		setTarget: Function,
	) {
		setTarget({
			commentId: commentId,
			authorId: authorId,
			author: author,
			modify: false,
		});
	}

	function setCommentTargetModify(
		commentId: number,
		authorId: number,
		author: string,
		setTarget: Function,
		context: string,
		callback: Function,
	) {
		setTarget({
			commentId: commentId,
			authorId: authorId,
			author: author,
			modify: true,
		});
		callback(context);
	}

	async function fetchLike(id: number, token: string) {
		let returnValue = -1;
		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/community/heart`,
			{
				method: 'POST',
				headers: {Authorization: token, 'Content-Type': 'application/json'},
				body: JSON.stringify({target: 'comment', id: Number(id)}),
			},
		);

		let result = await response.json();

		if (result.status === 200) {
			returnValue = result.data;
		} else if (result.status === 401) {
			refresh();
			alert('다시 시도해 주세요.');
		} else if (result.status === 404) {
			alert('삭제된 글 또는 댓글 입니다.');
		} else if (result.status === 409) {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/community/heart/comment/${id}`,
				{
					method: 'DELETE',
					headers: {Authorization: token, 'Content-Type': 'application/json'},
				},
			);

			let result = await response.json();
			if (result.status === 200) {
				returnValue = result.data;
			} else if (result.status === 401) {
				refresh();
				alert('다시 시도해 주세요.');
			} else if (result.status === 404) {
				alert('삭제된 글 또는 댓글 입니다.');
			}
		}

		return returnValue;
	}

	async function likeComment(parentId: number | null, commentId: number) {
		const token = window.localStorage.getItem('accessToken');
		if (!token) {
			dispatchEvent(new Event('fadeLogin'));
			return;
		}

		let newLikeCount: number;
		if (parentId == null) {
			newLikeCount = await fetchLike(commentId, token);

			let newCommentList: Comment[] = JSON.parse(JSON.stringify(commentList));

			newCommentList.forEach((comment: Comment) => {
				if (comment.id === commentId) comment.like = newLikeCount;
			});

			setCommentList(newCommentList);
		} else {
			newLikeCount = await fetchLike(commentId, token);

			let newCommentList: Comment[] = JSON.parse(
				JSON.stringify(entireCommentList),
			);

			newCommentList.forEach((comment: Comment) => {
				if (comment.id === parentId) {
					comment.comments.forEach((reply: Comment) => {
						if (reply.id === commentId) reply.like = newLikeCount;
					});
				}
			});

			setCommentList(newCommentList);
		}
	}

	return (
		<>
			{commentList && commentList.length === 0 && (
				<div className={styles.empty}>댓글을 작성 해 보세요.</div>
			)}
			{commentList &&
				commentList.map != null &&
				commentList.map((comment: Comment) => {
					switch (comment.deleteStatus) {
						case 1:
							comment.context = '삭제된 댓글입니다.';
							break;
						case 2:
							comment.author = '탈퇴한 사용자';
							comment.profile =
								'https://project-adopt-bucket.s3.ap-northeast-2.amazonaws.com/other/default-profile-image.jpeg';
							break;
					}

					if (comment.blindStatus === 1) {
						comment.context = '블라인드된 댓글입니다.';
					}

					return (
						<div className={styles.container} key={comment.id}>
							<div
								className={`${styles.comment} ${
									comment.type === 1 ? styles.reply : ''
								}`}
							>
								<div className={styles.upper}>
									<div className={styles.user}>
										<img
											className={styles.profile}
											src={comment.profile}
											alt={`${comment.profile} profile`}
										/>
										<span>{comment.author}</span>
									</div>
									<div className={styles.action}>
										{comment.mine ? (
											<>
												<button
													onClick={() => {
														setCommentTargetModify(
															comment.id,
															comment.authorId,
															comment.author,
															setTarget,
															comment.context,
															setInputValue,
														);
													}}
												>
													수정
												</button>
												{'·'}
												<button
													onClick={() => {
														deleteComment(comment.id);
													}}
												>
													삭제
												</button>
											</>
										) : (
											<>
												<button
													onClick={() => {
														likeComment(parentId, comment.id);
													}}
												>
													추천
												</button>
												{'·'}
												<button onClick={() => {}}>신고</button>
											</>
										)}
									</div>
								</div>
								<div className={styles.middle}>{comment.context}</div>
								<div className={styles.lower}>
									<div style={{display: 'flex'}}>
										<span>
											{toDate(new Date(comment.publishedAt).getTime())}
										</span>
										{comment.like !== 0 && (
											<div
												className={`${styles.likeCount} ${
													comment.type === 1 ? styles.likeCountReply : ''
												}`}
											>
												<img
													style={{marginBottom: '2px'}}
													src="/icon/like.svg"
													alt="like count"
													width={12}
													height={12}
												/>
												<span
													style={{
														padding: '0 0 0 4px',
														fontWeight: 'normal',
														fontSize: '14px',
													}}
												>
													{comment.like}
												</span>
											</div>
										)}
									</div>

									<button
										onClick={() => {
											setCommentTarget(
												parentId != null ? parentId : comment.id,
												comment.authorId,
												comment.author,
												setTarget,
											);
										}}
									>
										답글 작성
									</button>
								</div>
							</div>
							{comment.type === 0 && comment.comments && (
								<Comments
									parentId={comment.id}
									setTarget={setTarget}
									commentList={comment.comments}
									setCommentList={setCommentList}
									setInputValue={setInputValue}
									deleteComment={deleteComment}
									entireCommentList={commentList}
								/>
							)}
						</div>
					);
				})}
		</>
	);
}

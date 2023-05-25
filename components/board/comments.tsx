import styles from '@/styles/components/board/comments.module.scss';

export default function Comments({
	parentId,
	commentList,
	setTarget,
}: {
	parentId: number | null;
	commentList: any;
	setTarget: Function;
}) {
	return (
		<>
			{commentList.length === 0 && (
				<div className={styles.empty}>댓글을 작성 해 보세요.</div>
			)}
			{commentList.map((comment: any) => {
				function getCommentTarget() {
					setTarget({
						commentId: parentId != null ? parentId : comment.id,
						authorId: comment.authorId,
						username: comment.username,
					});
				}

				return (
					<div className={styles.container} key={comment.id}>
						<div
							className={`${styles.comment} ${
								comment.type === 'reply' ? styles.reply : ''
							}`}
						>
							<div className={styles.upper}>
								<div className={styles.user}>
									<img
										className={styles.profile}
										src={comment.profile}
										alt={`${comment.profile} profile`}
									/>
									<span>{comment.username}</span>
								</div>
								<div className={styles.action}>
									<button>수정</button>
									{'·'}
									<button>삭제</button>
								</div>
							</div>
							<div className={styles.middle}>{comment.context}</div>
							<div className={styles.lower}>
								<span>{comment.publishedAt}</span>
								<button onClick={getCommentTarget}>답글 작성</button>
							</div>
						</div>
						{comment.type === 'comment' && (
							<Comments
								parentId={comment.id}
								setTarget={setTarget}
								commentList={comment.commments}
							/>
						)}
					</div>
				);
			})}
		</>
	);
}

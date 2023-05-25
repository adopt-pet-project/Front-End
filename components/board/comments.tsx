import styles from '@/styles/components/board/comments.module.scss';
import {toDate} from '@/utils/functions/toDate';

export default function Comments({
	parentId,
	commentList,
	setTarget,
	setInputValue,
	deleteComment,
}: {
	parentId: number | null;
	commentList: any[];
	setTarget: Function;
	setInputValue: Function;
	deleteComment: Function;
}) {
	return (
		<>
			{commentList && commentList.length === 0 && (
				<div className={styles.empty}>댓글을 작성 해 보세요.</div>
			)}
			{commentList &&
				commentList.map((comment: any) => {
					function setCommentTarget() {
						setTarget({
							commentId: parentId != null ? parentId : comment.id,
							authorId: comment.authorId,
							author: comment.author,
							modify: false,
						});
					}

					function setCommentTargetModify() {
						setTarget({
							commentId: comment.id,
							authorId: comment.authorId,
							author: comment.author,
							modify: true,
						});
						setInputValue(comment.context);
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
										<span>{comment.author}</span>
									</div>
									<div className={styles.action}>
										<button onClick={setCommentTargetModify}>수정</button>
										{'·'}
										<button
											onClick={() => {
												deleteComment(comment.id);
											}}
										>
											삭제
										</button>
									</div>
								</div>
								<div className={styles.middle}>{comment.context}</div>
								<div className={styles.lower}>
									<span>{toDate(new Date(comment.publishedAt).getTime())}</span>
									<button onClick={setCommentTarget}>답글 작성</button>
								</div>
							</div>
							{comment.type === 'comment' && comment.comments && (
								<Comments
									parentId={comment.id}
									setTarget={setTarget}
									commentList={comment.commments}
									setInputValue={setInputValue}
									deleteComment={deleteComment}
								/>
							)}
						</div>
					);
				})}
		</>
	);
}

import styles from '@/styles/components/board/comments.module.scss';

export default function Comments({
	parentId,
	comments,
	setTarget,
}: {
	parentId: number | null;
	comments: any;
	setTarget: Function;
}) {
	return (
		<>
			{comments.map((comment: any) => {
				return (
					<div key={comment.id}>
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
									<span>
										{comment.username} {parentId}
									</span>
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
								<button onClick={() => {}}>답글 작성</button>
							</div>
						</div>
						{comment.type === 'comment' && (
							<Comments
								parentId={comment.id}
								setTarget={() => {}}
								comments={comment.commments}
							/>
						)}
					</div>
				);
			})}
		</>
	);
}

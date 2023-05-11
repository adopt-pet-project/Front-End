import styles from '@/styles/components/board/comments.module.scss';

export default function Comments({comments}: {comments: any}) {
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
									<span>{comment.author}</span>
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
								<button>답글 작성</button>
							</div>
						</div>
						{comment.type === 'comment' && (
							<Comments comments={comment.commments} />
						)}
					</div>
				);
			})}
		</>
	);
}

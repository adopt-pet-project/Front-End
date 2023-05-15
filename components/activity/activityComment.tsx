import styles from '@/styles/components/activity/activityComment.module.scss';

function ActivityComment({article}: {article: any}) {
	const {id, docId, title, comment, publishedAt} = article;
	return (
		<li className={styles.comment}>
			<div className={styles.title}>{title}</div>
			<div className={styles.content}>{comment}</div>
			<div>2023. 5. 3</div>
		</li>
	);
}

export default ActivityComment;

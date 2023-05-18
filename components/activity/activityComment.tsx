import styles from '@/styles/components/activity/activityComment.module.scss';
import {useRouter} from 'next/router';

function ActivityComment({article}: {article: any}) {
	const {id, docId, title, comment, publishedAt} = article;
	const router = useRouter();

	return (
		<li
			onClick={() => {
				router.push('/board/11');
			}}
			className={styles.comment}
		>
			<div className={styles.title}>{title}</div>
			<div className={styles.content}>{comment}</div>
			<div>2023. 5. 3</div>
		</li>
	);
}

export default ActivityComment;

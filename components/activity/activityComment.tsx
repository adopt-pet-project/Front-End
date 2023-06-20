import {useRouter} from 'next/router';
import styles from '@/styles/components/activity/activityComment.module.scss';

function ActivityComment({article}: {article: any}) {
	const {refId, title, contents, publishedAt} = article;
	const router = useRouter();

	return (
		<li
			onClick={() => {
				router.push(`/board/${refId}`);
			}}
			className={styles.comment}
		>
			<div className={styles.title}>{title}</div>
			<div className={styles.content}>{contents}</div>
			<div>{publishedAt}</div>
		</li>
	);
}

export default ActivityComment;

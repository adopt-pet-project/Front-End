import styles from '@/styles/components/adopt/author.module.scss';
import {AdoptAuthor} from '@/utils/@types/adopt';

export default function Author({author}: {author: AdoptAuthor}) {
	return (
		<div className={styles.container}>
			<img
				className={styles.profile}
				src={author.profile}
				alt={`${author.author} profile`}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<span className={styles.author}>{author.author}</span>
				<span>{author.location}</span>
			</div>
		</div>
	);
}

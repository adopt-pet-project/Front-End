import styles from '@/styles/components/adopt/author.module.scss';

export default function Author({author}: {author: AdoptAuthor}) {
	return (
		<div className={styles.container}>
			<img
				className={styles.profile}
				src={author.profile}
				alt={`${author.username} profile`}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<span className={styles.author}>{author.username}</span>
				<span>{author.address}</span>
			</div>
		</div>
	);
}

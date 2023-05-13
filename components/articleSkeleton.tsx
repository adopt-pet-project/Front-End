import styles from '@/styles/components/articleSkeleton.module.scss';

export default function ArticleSkeleton() {
	return (
		<article className={styles.container}>
			<div className={styles.thumbnail} />

			<div className={styles.description}>
				<div className={styles.preview}>
					<div className={styles.title}></div>
					<div className={styles.context}></div>
				</div>
				<div className={styles.metadata}>
					<div className={styles.author}></div>
					<div className={styles.dataList}></div>
				</div>
			</div>
		</article>
	);
}

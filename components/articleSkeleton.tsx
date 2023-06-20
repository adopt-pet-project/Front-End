import styles from '@/styles/components/articleSkeleton.module.scss';

export default function ArticleSkeleton() {
	return (
		<article className={styles.container}>
			<div className={styles.thumbnail} />
		</article>
	);
}

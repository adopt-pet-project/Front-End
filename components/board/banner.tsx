import styles from '@/styles/components/board/banner.module.scss';

export default function Banner({hot, weekly}: {hot: Adopt; weekly: Adopt}) {
	return (
		<div className={styles.banner}>
			<div className={styles.weekly}>
				<div className={styles.hot} style={{backgroundColor: 'var(--red)'}}>
					Weekly
				</div>
				<span className={styles.bannerTitle}>{weekly.title}</span>
				<span className={styles.bannerTime}>{weekly.publishedAt}</span>
			</div>
			<div className={styles.trending}>
				<div className={styles.hot} style={{backgroundColor: 'var(--black)'}}>
					Trending
				</div>
				<span className={styles.bannerTitle}>{hot.title}</span>
				<span className={styles.bannerTime}>{weekly.publishedAt}</span>
			</div>
		</div>
	);
}

import styles from '@/styles/components/board/banner.module.scss';

export default function Banner() {
	return (
		<div className={styles.banner}>
			<div className={styles.weekly}>
				<div className={styles.hot} style={{backgroundColor: 'var(--red)'}}>
					Weekly
				</div>
				<span className={styles.bannerTitle}>꿀팁 & 링크 모음</span>
				<span className={styles.bannerTime}>3일 전</span>
			</div>
			<div className={styles.trending}>
				<div className={styles.hot} style={{backgroundColor: 'var(--black)'}}>
					Trending
				</div>
				<span className={styles.bannerTitle}>옆집이 수상해요..</span>
				<span className={styles.bannerTime}>3시간 전</span>
			</div>
		</div>
	);
}

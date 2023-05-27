import {useRouter} from 'next/router';
import styles from '@/styles/components/board/banner.module.scss';

export default function Banner({hot, weekly}: {hot: Board; weekly: Board}) {
	const router = useRouter();

	return (
		<div className={styles.banner}>
			{weekly && (
				<div
					className={styles.weekly}
					onClick={() => {
						router.push(`/board/${weekly.id}`);
					}}
				>
					<div className={styles.hot} style={{backgroundColor: 'var(--red)'}}>
						Weekly
					</div>
					<span className={styles.bannerTitle}>{weekly.title}</span>
					<span className={styles.bannerTime}>{weekly.publishedAt}</span>
				</div>
			)}
			{hot && (
				<div
					className={styles.trending}
					onClick={() => {
						router.push(`/board/${hot.id}`);
					}}
				>
					<div className={styles.hot} style={{backgroundColor: 'var(--black)'}}>
						Trending
					</div>
					<span className={styles.bannerTitle}>{hot.title}</span>
					<span className={styles.bannerTime}>{weekly.publishedAt}</span>
				</div>
			)}
		</div>
	);
}

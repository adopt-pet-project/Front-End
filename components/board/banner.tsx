import styles from '@/styles/components/board/banner.module.scss';
import {useRouter} from 'next/router';

export default function Banner({hot, weekly}: {hot: Adopt; weekly: Adopt}) {
	const router = useRouter();

	return (
		<div className={styles.banner}>
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
		</div>
	);
}

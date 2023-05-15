import styles from '@/styles/components/board/option.module.scss';

export default function Option() {
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<img src="/icon/like.svg" alt="like" />
				좋아요
			</div>
			<div className={styles.item}>
				<img src="/icon/report.svg" alt="report" />
				신고
			</div>
		</div>
	);
}

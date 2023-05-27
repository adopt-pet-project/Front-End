import More from './more';
import styles from '@/styles/components/board/header.module.scss';

export default function Header({header}: {header: any}) {
	return (
		<div className={styles.container}>
			<span className={styles.title}>{header.title}</span>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<div className={styles.authorInfo}>
					<img className={styles.profile} src={header.profile} alt="profile" />
					<span className={styles.author}>{header.username}</span>
				</div>
				<More />
			</div>
			<div className={styles.metadata}>
				<span>{`조회 ${header.view} 댓글 ${header.comment} 추천 ${header.like}`}</span>
				<span>{header.publishedAt}</span>
			</div>
		</div>
	);
}

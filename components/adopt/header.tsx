import styles from '@/styles/components/adopt/header.module.scss';
import {AdoptHeader} from '@/utils/@types/adopt';

const status = ['분양 중', '분양 예약', '분양 완료'];

export default function Header({header}: {header: AdoptHeader}) {
	return (
		<header className={styles.container}>
			<span className={styles.title}>{header.title}</span>
			<div className={styles.status}>
				<span>{status[header.status]}</span>
				<span>{header.publishedAt}</span>
			</div>
		</header>
	);
}

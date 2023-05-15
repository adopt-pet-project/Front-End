import styles from '@/styles/components/adopt/header.module.scss';

export default function Header({header}: {header: any}) {
	return (
		<header className={styles.container}>
			<span className={styles.title}>{header.title}</span>
			<div className={styles.status}>
				<span>{header.status}</span>
				<span>{header.publishedAt}</span>
			</div>
		</header>
	);
}

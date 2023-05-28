import styles from '@/styles/components/chat/divider.module.scss';

export default function Divider() {
	return (
		<div className={styles.container}>
			<div className={styles.leftLine}></div>
			<span>새로운 메시지</span>
			<div className={styles.rightLine}></div>
		</div>
	);
}

import styles from '@/styles/components/admin/admin.module.scss';

function BlockBoardLine({lineData}: {lineData: Boardblock}) {
	const {state, userId, userName, times, blockDate, reason} = lineData;
	return (
		<li className={styles.reportLine}>
			<span>{state}</span>
			<span>{userName}</span>
			<span>{times}</span>
			<span>{blockDate}</span>
			<span>{reason}</span>
			<span>해제</span>
		</li>
	);
}

export default BlockBoardLine;

import styles from '@/styles/components/admin/manage/boardLine.module.scss';

function BlockBoardLine({lineData}: {lineData: Boardblock}) {
	const {state, userId, userName, times, blockDate, reason} = lineData;
	return (
		<li>
			<span>{state}</span>
			<span className={styles.userName}>{userName}</span>
			<span>{times}</span>
			<span>{blockDate}</span>
			<span>{reason}</span>
			<span>해제</span>
		</li>
	);
}

export default BlockBoardLine;

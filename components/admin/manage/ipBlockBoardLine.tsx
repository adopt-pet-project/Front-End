import styles from '@/styles/components/admin/admin.module.scss';

function IpBlockBoardLine({lineData}: {lineData: Boardipblock}) {
	const {ipAddress, blockDate} = lineData;
	return (
		<li>
			<span>{ipAddress}</span>
			<span>{blockDate}</span>
			<span>해제</span>
		</li>
	);
}

export default IpBlockBoardLine;

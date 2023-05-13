import styles from '@/styles/components/admin/manage/ipBlockBoard.module.scss';
import {useState} from 'react';
import IpBlockBoardLine from './ipBlockBoardLine';
import IpAddLine from './ipAddLine';

function IpBlockBoard() {
	const [ipList, setIpList] = useState<Boardipblock[]>([
		{
			ipAddress: '203.232.200.71',
			blockDate: '2023. 5. 1',
		},
	]);
	return (
		<>
			<div className={styles.searchBar}>
				<img src={`/icon/magnifier.svg`} alt="menu" />
				<input type="text" placeholder="search" />
			</div>

			<div className={styles.ipBlockLineTag}>
				<span>IP Address</span>
				<span>차단일</span>
				<span>
					<img width="18" height="18" src={`/icon/reload.svg`} alt="" />
				</span>
			</div>
			<hr className={styles.tagBoundary} />
			<ul className={styles.ipBlockList}>
				<IpAddLine />
				{ipList.map((data, i) => (
					<IpBlockBoardLine key={i} lineData={data} />
				))}
			</ul>
		</>
	);
}

export default IpBlockBoard;

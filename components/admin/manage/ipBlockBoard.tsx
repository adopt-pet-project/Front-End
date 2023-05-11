import styles from '@/styles/components/admin/admin.module.scss';
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
				<img src={`/magnifier.svg`} alt="menu" />
				<input type="text" placeholder="search" />
			</div>
			<div className={styles.ipBlockLineTag}>
				<span>IP Address</span>
				<span>차단일</span>
				<span>리셋</span>
			</div>
			<hr className={styles.tagBoundary} />
			<ul className={styles.ipBlockList}>
				<button className={styles.ipAddBtn}>+ 추가</button>
				<IpAddLine />
				{ipList.map((data, i) => (
					<IpBlockBoardLine key={i} lineData={data} />
				))}
			</ul>
		</>
	);
}

export default IpBlockBoard;
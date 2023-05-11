import styles from '@/styles/components/admin/manage/userBoard.module.scss';
import BoardUserLine from './userBoardLine';
import {useState} from 'react';

function UserBoard() {
	const [userList, setUserList] = useState<Boarduser[]>([
		{
			id: 2,
			name: '성익현',
			sanctions: 0,
			joinDate: '2023. 5. 3',
			ip: '203.232.200.71',
			state: true,
		},
		{
			id: 223,
			name: '홍길동',
			sanctions: 2,
			joinDate: '2023. 5. 3',
			ip: '203.232.200.71',
			state: true,
		},
		{
			id: 71,
			name: '전우치',
			sanctions: 1,
			joinDate: '2023. 5. 3',
			ip: '203.232.200.71',
			state: false,
		},
		{
			id: 4,
			name: '정상수',
			sanctions: 8,
			joinDate: '2023. 5. 3',
			ip: '203.232.200.71',
			state: true,
		},
	]);
	return (
		<>
			<div className={styles.searchBar}>
				<img src={`/magnifier.svg`} alt="menu" />
				<input type="text" placeholder="search" />
			</div>
			<div className={styles.userLineTag}>
				<span>ID</span>
				<span>성명</span>
				<span>제재누적</span>
				<span>가입일</span>
				<span>상태(IP)</span>
				<span>
					<img width="18" height="18" src={`/reload.svg`} alt="" />
				</span>
			</div>
			<hr className={styles.tagBoundary} />
			<ul className={styles.userList}>
				{userList.map((data, i) => (
					<BoardUserLine key={i} lineData={data} />
				))}
			</ul>
		</>
	);
}

export default UserBoard;

import styles from '@/styles/components/admin/manage/blockBoard.module.scss';
import {useState} from 'react';
import BlockBoardLine from './blockBoardLine';

function BlockBoard() {
	const [reportList, setReportList] = useState<Boardblock[]>([
		{
			state: '접속차단 3일',
			userId: 3,
			userName: '성익현',
			times: 3,
			blockDate: '2023. 5. 1',
			reason: '음란물 게시',
		},
		{
			state: '작성제한 영구',
			userId: 223,
			userName: '홍길동',
			times: 4,
			blockDate: '2023. 5. 1',
			reason: '음란물 게시',
		},
		{
			state: '접속차단 3일',
			userId: 223,
			userName: '홍길동',
			times: 4,
			blockDate: '2023. 5. 1',
			reason: '음란물 게시',
		},
		{
			state: '작성제한 1달',
			userId: 223,
			userName: '홍길동',
			times: 4,
			blockDate: '2023. 5. 1',
			reason: '음란물 게시',
		},
	]);
	return (
		<>
			<div className={styles.searchBar}>
				<img src={`/icon/magnifier.svg`} alt="menu" />
				<input type="text" placeholder="search" />
			</div>
			<div className={styles.blockLineTag}>
				<span>상태</span>
				<span>성명</span>
				<span>누적</span>
				<span>신고일자</span>
				<span>사유</span>
				<span>
					<img width="18" height="18" src={`/icon/reload.svg`} alt="" />
				</span>
			</div>
			<hr className={styles.tagBoundary} />
			<ul className={styles.blockList}>
				{reportList.map((data, i) => (
					<BlockBoardLine key={i} lineData={data} />
				))}
			</ul>
		</>
	);
}

export default BlockBoard;

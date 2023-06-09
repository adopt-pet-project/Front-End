import {useState} from 'react';
import BoardReportLine from './reportBoardLine';
import styles from '@/styles/components/admin/manage/reportBoard.module.scss';

function ReportBoard() {
	const [reportList, setReportList] = useState<Boardreport[]>([
		{
			id: 3,
			state: '반려',
			contentId: 3,
			reporterId: 1,
			reporter: '성익현',
			targetId: 3,
			target: '홍길동',
			summary: '음란물 게시',
			reportDate: '2023. 5. 1',
		},
		{
			id: 4,
			state: '미확인',
			contentId: 3,
			reporterId: 1,
			reporter: '성익현',
			targetId: 223,
			target: '전우치',
			summary: '음란물 게시',
			reportDate: '2023. 5. 1',
		},
		{
			id: 5,
			state: '반려',
			contentId: 3,
			reporterId: 1,
			reporter: '성익현',
			targetId: 71,
			target: '전우치',
			summary: '음란물 게시',
			reportDate: '2023. 5. 1',
		},
		{
			id: 6,
			state: '반려',
			contentId: 3,
			reporterId: 1,
			reporter: '성익현',
			targetId: 4,
			target: '정상수',
			summary: '음란물 게시',
			reportDate: '2023. 5. 1',
		},
	]);
	return (
		<>
			<div className={styles.searchBar}>
				<img src={`/icon/magnifier.svg`} alt="menu" />
				<input type="text" placeholder="search" />
			</div>
			<div className={styles.reportLineTag}>
				<span>상태</span>
				<span>신고자</span>
				<span>대상</span>
				<span>내용</span>
				<span>신고일자</span>
				<span>
					<img width="18" height="18" src={`/icon/reload.svg`} alt="" />
				</span>
			</div>
			<hr className={styles.tagBoundary} />
			<ul className={styles.reportList}>
				{reportList.map((data, i) => (
					<BoardReportLine key={i} lineData={data} />
				))}
			</ul>
		</>
	);
}

export default ReportBoard;

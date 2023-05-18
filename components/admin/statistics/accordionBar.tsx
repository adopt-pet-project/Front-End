import React, {useEffect, useState} from 'react';
import styles from '@/styles/components/admin/statistics/accordionBar.module.scss';
import Graph from './graph';

function AccordionBar() {
	const [isUserGraph, setIsUserGraph] = useState(false);
	const [isAdoptGraph, setIsAdoptGraph] = useState(false);
	const [isContentGraph, setIsContentGraph] = useState(false);

	const userData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: '접속자 수',
				data: [0, 1, 2, 44, 4, 5, 6],
				borderColor: 'rgb(53, 235, 162)',
				backgroundColor: 'rgba(70, 255, 170, 0.5)',
			},
			{
				label: '탈퇴 회원 수',
				data: [0, 2, 4, 6, 8, 9, 5],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 120, 155, 0.5)',
			},
			{
				label: '총 회원 수',
				data: [22, 25, 26, 28, 27, 28, 28],
				borderColor: 'rgb(235, 80, 235)',
				backgroundColor: 'rgba(235, 162, 235, 0.5)',
			},
			{
				label: '가입 회원 수',
				data: [0, 2, 4, 16, 8, 6, 5],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	const adoptData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: '예약 중 수',
				data: [0, 1, 2, 44, 4, 5, 6],
				borderColor: 'rgb(53, 235, 162)',
				backgroundColor: 'rgba(70, 255, 170, 0.5)',
			},
			{
				label: '완료 수',
				data: [0, 2, 4, 6, 8, 9, 5],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 120, 155, 0.5)',
			},
			{
				label: '대기중 수',
				data: [22, 25, 26, 28, 27, 28, 28],
				borderColor: 'rgb(235, 80, 235)',
				backgroundColor: 'rgba(235, 162, 235, 0.5)',
			},
			{
				label: '신규 분양 수',
				data: [0, 2, 4, 16, 8, 6, 5],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	const contentsData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: '댓글 생성 수',
				data: [0, 1, 2, 44, 4, 5, 6],
				borderColor: 'rgb(53, 235, 162)',
				backgroundColor: 'rgba(70, 255, 170, 0.5)',
			},
			{
				label: '글 생성 수',
				data: [0, 2, 4, 6, 8, 9, 5],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 120, 155, 0.5)',
			},
		],
	};

	useEffect(() => {
		if (isUserGraph === true) {
			setIsAdoptGraph(false);
			setIsContentGraph(false);
		}
	}, [isUserGraph]);

	useEffect(() => {
		if (isAdoptGraph === true) {
			setIsUserGraph(false);
			setIsContentGraph(false);
		}
	}, [isAdoptGraph]);

	useEffect(() => {
		if (isContentGraph === true) {
			setIsAdoptGraph(false);
			setIsUserGraph(false);
		}
	}, [isContentGraph]);

	return (
		<ul className={styles.AccordionUl}>
			<li className={styles.menuLi}>
				{isUserGraph ? <Graph data={userData} /> : null}
				<div
					onClick={() => {
						setIsUserGraph(prev => !prev);
					}}
					className={styles.menuTitle}
				>
					<p className={`${isUserGraph ? styles.on : null}`}>
						사용자 통계 {'>'}
					</p>
					<hr className={styles.menuBoundary} />
				</div>
			</li>

			<li className={styles.menuLi}>
				{isAdoptGraph ? <Graph data={adoptData} /> : null}
				<div
					onClick={() => {
						setIsAdoptGraph(prev => !prev);
					}}
					className={styles.menuTitle}
				>
					<p className={`${isAdoptGraph ? styles.on : null}`}>
						분양 통계 {'>'}
					</p>
					<hr className={styles.menuBoundary} />
				</div>
			</li>

			<li className={styles.menuLi}>
				{isContentGraph ? <Graph data={contentsData} /> : null}
				<div
					onClick={() => {
						setIsContentGraph(prev => !prev);
					}}
					className={styles.menuTitle}
				>
					<p className={`${isContentGraph ? styles.on : null}`}>
						컨텐츠 통계 {'>'}
					</p>
					<hr className={styles.menuBoundary} />
				</div>
			</li>
		</ul>
	);
}

export default AccordionBar;

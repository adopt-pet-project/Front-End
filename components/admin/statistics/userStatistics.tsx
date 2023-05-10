import React, {useState} from 'react';
import styles from '@/styles/components/admin/admin.module.scss';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

function UserStatistics() {
	const [timeSelect, setTimeSelect] = useState<'일간' | '주간' | '월간'>(
		'일간',
	);
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
			},
		},
	};

	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
	];
	const data = {
		labels,
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

	return (
		<div>
			<Line data={data} options={options} />
			<div className={styles.timeSelectBar}>
				<span
					onClick={() => {
						setTimeSelect('일간');
					}}
					className={`${timeSelect === '일간' ? styles.selected : null}`}
				>
					일간
				</span>
				<span
					onClick={() => {
						setTimeSelect('주간');
					}}
					className={`${timeSelect === '주간' ? styles.selected : null}`}
				>
					주간
				</span>
				<span
					onClick={() => {
						setTimeSelect('월간');
					}}
					className={`${timeSelect === '월간' ? styles.selected : null}`}
				>
					월간
				</span>
			</div>
		</div>
	);
}

export default UserStatistics;

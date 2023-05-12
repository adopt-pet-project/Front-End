import React, {useState} from 'react';
import styles from '@/styles/components/admin/statistics/graph.module.scss';
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

function StatisticsGraph({
	data,
}: {
	data: {
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			borderColor: string;
			backgroundColor: string;
		}[];
	};
}) {
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

export default StatisticsGraph;

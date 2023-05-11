import React, {useState} from 'react';
import styles from '@/styles/components/admin/manage/ManageBoard.module.scss';
import UserBoard from './userBoard';
import ReportBoard from './reportBoard';
import BlockBoard from './blockBoard';
import IpBlockBoard from './ipBlockBoard';
function ManageBoard() {
	const [currentTable, setCurrentTable] = useState<
		'user' | 'report' | 'block' | 'IP-block'
	>('user');

	//가라데이터

	return (
		<>
			<div className={styles.tableCtg}>
				<span
					className={`${
						currentTable === 'user' ? styles.current : null
					} drag-prevent`}
					onClick={() => {
						setCurrentTable('user');
					}}
				>
					User({2004})
				</span>
				<span
					className={`${
						currentTable === 'report' ? styles.current : null
					} drag-prevent`}
					onClick={() => {
						setCurrentTable('report');
					}}
				>
					Report
				</span>
				<span
					className={`${
						currentTable === 'block' ? styles.current : null
					} drag-prevent`}
					onClick={() => {
						setCurrentTable('block');
					}}
				>
					Block
				</span>
				<span
					className={`${
						currentTable === 'IP-block' ? styles.current : null
					} drag-prevent`}
					onClick={() => {
						setCurrentTable('IP-block');
					}}
				>
					IP-Block
				</span>
			</div>
			{currentTable === 'user' ? (
				<UserBoard />
			) : currentTable === 'report' ? (
				<ReportBoard />
			) : currentTable === 'block' ? (
				<BlockBoard />
			) : currentTable === 'IP-block' ? (
				<IpBlockBoard />
			) : null}
		</>
	);
}

export default ManageBoard;

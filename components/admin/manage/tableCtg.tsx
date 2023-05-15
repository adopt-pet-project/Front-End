import React, {useState} from 'react';
import styles from '@/styles/components/admin/manage/tableCtg.module.scss';
import {useRecoilState} from 'recoil';
import {AcurrentTable} from '@/utils/recoil/recoilStore';

function TableCtg() {
	const [currentTable, setCurrentTable] = useRecoilState(AcurrentTable);
	return (
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
	);
}

export default TableCtg;
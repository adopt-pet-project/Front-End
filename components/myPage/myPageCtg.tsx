import styles from '@/styles/components/myPage/myPageCtg.module.scss';
import {useEffect, useRef, useState} from 'react';

function MyPageCtg() {
	const ctgRef = useRef<HTMLDivElement>(null);

	const [currentBtn, setCurrentBtn] = useState<0 | 1 | 2 | 3>(0);

	return (
		<>
			<div ref={ctgRef} className={styles.myPageCtg}>
				<div
					onClick={e => {
						setCurrentBtn(0);
					}}
					className={`${styles.categoryBtn} ${
						currentBtn === 0 ? styles.currentBtn : null
					}`}
				>
					분양중
				</div>
				<div
					onClick={e => {
						setCurrentBtn(1);
					}}
					className={`${styles.categoryBtn} ${
						currentBtn === 1 ? styles.currentBtn : null
					}`}
				>
					예약됨
				</div>
				<div
					onClick={e => {
						setCurrentBtn(2);
					}}
					className={`${styles.categoryBtn} ${
						currentBtn === 2 ? styles.currentBtn : null
					}`}
				>
					분양완료
				</div>
				<div
					onClick={e => {
						setCurrentBtn(3);
					}}
					className={`${styles.categoryBtn} ${
						currentBtn === 3 ? styles.currentBtn : null
					}`}
				>
					관심분양
				</div>
			</div>
		</>
	);
}

export default MyPageCtg;

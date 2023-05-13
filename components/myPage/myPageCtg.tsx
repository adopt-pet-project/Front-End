import styles from '@/styles/components/myPage/myPageCtg.module.scss';
import {AmyPageBoardType} from '@/utils/recoil/recoilStore';
import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';

function MyPageCtg() {
	const ctgRef = useRef<HTMLDivElement>(null);

	const [currentBtn, setCurrentBtn] = useState<0 | 1 | 2 | 3>(0);
	const [myPageBoardType, setMyPageBoardType] =
		useRecoilState(AmyPageBoardType);

	return (
		<>
			<div ref={ctgRef} className={styles.myPageCtg}>
				<div
					onClick={e => {
						setCurrentBtn(0);
						setMyPageBoardType('adopting');
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
						setMyPageBoardType('reserved');
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
						setMyPageBoardType('end');
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
						setMyPageBoardType('interested');
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

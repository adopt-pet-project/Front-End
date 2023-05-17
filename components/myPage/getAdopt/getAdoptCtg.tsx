import styles from '@/styles/components/myPage/getAdopt/getAdoptCtg.module.scss';
import {AgetAdoptBoardType} from '@/utils/recoil/recoilStore';
import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';

function GetAdoptCtg() {
	const ctgRef = useRef<HTMLDivElement>(null);

	const [currentBtn, setCurrentBtn] = useState<0 | 1>(0);
	const [getAdoptBoardType, setGetAdoptBoardType] =
		useRecoilState(AgetAdoptBoardType);

	return (
		<>
			<div ref={ctgRef} className={styles.myPageCtg}>
				<div
					onClick={e => {
						setCurrentBtn(0);
						setGetAdoptBoardType('reserved');
					}}
					className={`${styles.categoryBtn} ${
						currentBtn === 0 ? styles.currentBtn : null
					}`}
				>
					예약됨
				</div>
				<div
					onClick={e => {
						setCurrentBtn(1);
						setGetAdoptBoardType('end');
					}}
					className={`${styles.categoryBtn} ${
						currentBtn === 1 ? styles.currentBtn : null
					}`}
				>
					분양완료
				</div>
			</div>
		</>
	);
}

export default GetAdoptCtg;

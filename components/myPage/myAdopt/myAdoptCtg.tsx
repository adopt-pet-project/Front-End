import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';
import {AmyAdoptBoardType, AmyAdoptModal} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/myPage/myAdopt/myAdoptCtg.module.scss';

function MyAdoptCtg() {
	const [myAdoptModal, setMyAdoptModal] = useRecoilState(AmyAdoptModal);
	const [currentBtn, setCurrentBtn] = useState<0 | 1 | 2 | 3>(0);
	const [myAdoptBoardType, setMyAdoptBoardType] =
		useRecoilState(AmyAdoptBoardType);
	const ctgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMyAdoptModal(prev => ({...prev, isOn: false}));
	}, [myAdoptBoardType]);

	return (
		<>
			<div ref={ctgRef} className={styles.myAdoptCtg}>
				<div
					onClick={e => {
						setCurrentBtn(0);
						setMyAdoptBoardType('adopting');
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
						setMyAdoptBoardType('reserved');
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
						setMyAdoptBoardType('end');
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
						setMyAdoptBoardType('interested');
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

export default MyAdoptCtg;

import React from 'react';
import styles from '@/styles/components/myPage/myPageCtg.module.scss';
import {useRecoilState} from 'recoil';
import {AcurrentMyPageCtg} from '@/utils/recoil/recoilStore';

function MyPageCtg() {
	const [currentCtg, setCurrentCtg] = useRecoilState(AcurrentMyPageCtg);
	return (
		<div className={styles.myPageCtg}>
			<span
				onClick={() => {
					setCurrentCtg(0);
				}}
				className={`${currentCtg === 0 ? styles.on : null}`}
			>
				프로필
			</span>
			<span
				onClick={() => {
					setCurrentCtg(1);
				}}
				className={`${currentCtg === 1 ? styles.on : null}`}
			>
				쪽지함
			</span>
			<span
				onClick={() => {
					setCurrentCtg(2);
				}}
				className={`${currentCtg === 2 ? styles.on : null}`}
			>
				채팅방
			</span>
		</div>
	);
}

export default MyPageCtg;

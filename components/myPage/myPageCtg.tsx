import React from 'react';
import styles from '@/styles/components/myPage/myPageCtg.module.scss';
import {useRecoilState} from 'recoil';
import {AcurrentMyPageCtg} from '@/utils/recoil/recoilStore';

function MyPageCtg() {
	const [currentCtg, setCurrentCtg] = useRecoilState(AcurrentMyPageCtg);
	const ctg: {num: 0 | 1 | 2; tag: string}[] = [
		{num: 0, tag: '프로필'},
		{num: 1, tag: '쪽지함'},
		{num: 2, tag: '채팅방'},
	];

	return (
		<div className={styles.myPageCtg}>
			{ctg.map((data, i) => (
				<span
					key={i}
					onClick={() => {
						setCurrentCtg(data.num);
					}}
					className={`${currentCtg === data.num ? styles.on : null}`}
				>
					{data.tag}
				</span>
			))}
		</div>
	);
}

export default MyPageCtg;

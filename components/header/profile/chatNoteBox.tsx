import React from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/header/profile/chatNoteBox.module.scss';
import {useRecoilState} from 'recoil';
import {AcurrentMyPageCtg, AisProfileBoxOn} from '@/utils/recoil/recoilStore';

function ChatNoteBox() {
	const router = useRouter();
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	const [myPageCtg, setMyPageCtg] = useRecoilState(AcurrentMyPageCtg);
	return (
		<div className={styles.navWrap}>
			<div
				onClick={() => {
					setMyPageCtg(1);
					setIsProfileBoxOn(false);
					router.push('/myPage');
				}}
				className={styles.box}
			>
				쪽지함
			</div>
			<div
				onClick={() => {
					setMyPageCtg(2);
					setIsProfileBoxOn(false);
					router.push('/myPage');
				}}
				className={styles.box}
			>
				채팅방
			</div>
		</div>
	);
}

export default ChatNoteBox;

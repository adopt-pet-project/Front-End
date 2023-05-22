import React from 'react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {AisAlarmBoxOn} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/header/alarm/alarmCard/chatCard.module.scss';

function ChatCard({data}: {data: Chatdata}) {
	const router = useRouter();
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	return (
		<div
			onClick={() => {
				router.push('/chat/11');
				setIsAlarmBoxOn(false);
			}}
			className={styles.cardWrap}
		>
			<div className={styles.nameWrap}>
				<span className={styles.name}>
					{data.name}ㆍ{data.docTitle}
				</span>
				<span className={styles.number}>{data.stack}</span>
			</div>
			<div className={styles.contents}>{data.content}</div>
			<div className={styles.date}>{data.date}</div>
		</div>
	);
}

export default ChatCard;

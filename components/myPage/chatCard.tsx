import React from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/myPage/chatCard.module.scss';
import timeTransformerToNum from '@/utils/functions/timeTranslaterToNum';

function ChatCard({data}: {data: ChatOnMy}) {
	const router = useRouter();

	const {
		chatNo,
		latestMessage,
		participant,
		regDate,
		saleTitle,
		unReadCount,
		saleNo,
	} = data;


	console.log(data.latestMessage);
	return (
		<li
			onClick={() => {

				router.push(`/chat/${chatNo}?adoptId=${saleNo}`);

			}}
			className={styles.chatCard}
		>
			<div className={styles.name}>
				{saleTitle} ㆍ
				<span style={{color: 'var(--skyblue)'}}> {participant.username}</span>
				<span style={{color: 'red'}}>
					{unReadCount !== 0 ? `${unReadCount}` : null}
				</span>
			</div>
			<div className={styles.contents}>
				{!latestMessage ? (
					<span style={{color: 'purple'}}>새로 생성된 채팅방</span>
				) : latestMessage.context ? (
					latestMessage.context
				) : null}
			</div>
			<div className={styles.date}>
				{!latestMessage
					? timeTransformerToNum(regDate)
					: timeTransformerToNum(latestMessage.sendAt)
					? timeTransformerToNum(latestMessage.sendAt)
					: null}
			</div>
		</li>
	);
}

export default ChatCard;

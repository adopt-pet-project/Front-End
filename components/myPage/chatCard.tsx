import React from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/myPage/chatCard.module.scss';
function ChatCard({
	data,
}: {
	data: {
		id: number;
		name: string;
		title: string;
		contents: string;
		date: string;
		new: boolean;
	};
}) {
	const router = useRouter();
	return (
		<li
			onClick={() => {
				router.push(`/chat/${data.id}`);
			}}
			className={styles.chatCard}
		>
			<div className={styles.name}>
				{data.name}ㆍ{data.title}
				<span style={{color: 'red'}}> {data.new ? 'N' : null}</span>
			</div>
			<div className={styles.contents}>{data.contents}</div>
			<div className={styles.date}>{data.date}</div>
		</li>
	);
}

export default ChatCard;

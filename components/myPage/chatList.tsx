import React, {useState} from 'react';
import ChatCard from './chatCard';
import styles from '@/styles/components/myPage/chatList.module.scss';
function ChatList() {
	const [chatData, setChatData] = useState([
		{
			id: 0,
			name: '홍길동',
			title: '진돗개 분양합니다.',
			contents: '혹시 댕댕이 예방접종 받앗나요...?',
			date: '2023. 5. 1',
			new: false,
		},
		{
			id: 1,
			name: '강형욱',
			title: '포메라니안 분양해요~',
			contents: '분양 희망합니다!!!',
			date: '2022.10. 4',
			new: true,
		},
	]);
	return (
		<ul className={styles.chatList}>
			{chatData.map((data, i) => (
				<ChatCard data={data} key={i} />
			))}
		</ul>
	);
}

export default ChatList;

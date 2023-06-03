import React, {useEffect, useState} from 'react';
import ChatCard from './chatCard';
import styles from '@/styles/components/myPage/chatList.module.scss';
import useFetch from '@/utils/hooks/useFetch';
function ChatList() {
	const [chatData, setChatData] = useState<ChatOnMy[]>([]);

	const [_, fetchChatroom] = useFetch('/chatroom', 'GET', true, data => {
		setChatData(data);
	});

	useEffect(() => {
		fetchChatroom();
	}, []);

	return (
		<ul className={styles.chatList}>
			{chatData.map((data, i) => (
				<ChatCard data={data} key={i} />
			))}
		</ul>
	);
}

export default ChatList;

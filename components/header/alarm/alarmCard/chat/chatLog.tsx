import React, {useEffect, useState} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chat/chatLog.module.scss';
import Chatbox from './chatbox';

function ChatLog() {
	const [on, setOn] = useState(false);
	const [chatData, setChatData] = useState<
		(chatLogLocationData | chatLogStringData)[]
	>([
		{
			id: 0,
			type: 'text',
			chatContents: '강아지 사진좀 보여주실래요?',
			date: '2023. 5. 1 11:30',
			checked: true,
			isMy: false,
		},
		{
			id: 1,
			type: 'image',
			chatContents:
				'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
			date: '2023. 5. 2 11:20',
			checked: true,
			isMy: true,
		},
		{
			id: 2,
			type: 'text',
			chatContents:
				'댕댕이 진짜 너무 귀여워요 혹시 다른 사진 있으면 더 보내주세요 ㅠㅠ',
			date: '2023. 5. 3 12:23',
			checked: true,
			isMy: false,
		},
		{
			id: 3,
			type: 'text',
			chatContents: '왜 채팅을 안보세요...',
			date: '2023. 5. 6 16:30',
			checked: true,
			isMy: false,
		},
		{
			id: 4,
			type: 'location',
			chatContents: {x: '37.55467', y: '126.970609'},
			date: '2023. 5. 7 16:38',
			checked: true,
			isMy: true,
		},
		{
			id: 5,
			type: 'text',
			chatContents: '분양 받으시려면 여기로 오세욘',
			date: '2023. 5. 7 16:40',
			checked: false,
			isMy: true,
		},
		{
			id: 5,
			type: 'text',
			chatContents: '분양 받으시려면 여기로 오세욘',
			date: '2023. 5. 7 16:40',
			checked: false,
			isMy: true,
		},
	]);
	useEffect(() => {
		setOn(true);
	}, []);
	return (
		<ul className={styles.chatBody}>
			{chatData.map((data, i) => (
				<Chatbox data={data} key={i} />
			))}
		</ul>
	);
}

export default ChatLog;

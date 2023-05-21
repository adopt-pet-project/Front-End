import React, {useEffect, useState} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chat/chatLog.module.scss';

function ChatLog() {
	const [on, setOn] = useState(false);

	useEffect(() => {
		setOn(true);
	}, []);
	return <div>채팅 로그가 보여질 부분</div>;
}

export default ChatLog;

import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chat/chatMain.module.scss';
import ChatLog from './chatLog';
import Input from './input';
function ChatMain() {
	return (
		<div className={styles.chatMain}>
			<ChatLog />
			<Input />
		</div>
	);
}

export default ChatMain;

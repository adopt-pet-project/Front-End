import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chat/chatBox.module.scss';
import ChatLocationBox from './chatLocationBox';
function Chatbox({data}: {data: chatLogLocationData | chatLogStringData}) {
	switch (data.type) {
		case 'text':
			return (
				<div className={`${styles.line} ${data.isMy ? styles.my : null}`}>
					<div className={styles.chatBox}>{data.chatContents as string}</div>
				</div>
			);
		case 'image':
			return (
				<div className={`${styles.line}  ${data.isMy ? styles.my : null}`}>
					<img
						className={styles.chatImage}
						src={data.chatContents as string}
						alt="채팅사진"
					/>
				</div>
			);
		case 'location':
			return (
				<div className={`${styles.line}  ${data.isMy ? styles.my : null}`}>
					<ChatLocationBox location={data.chatContents} />
				</div>
			);
		default:
			return <></>;
	}
}

export default Chatbox;

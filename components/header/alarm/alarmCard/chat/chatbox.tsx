import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chat/chatBox.module.scss';
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
					<div className={styles.chatBox}>{data.chatContents as string}</div>
				</div>
			);
		case 'location':
			return (
				<div className={`${styles.line}  ${data.isMy ? styles.my : null}`}>
					<div className={styles.chatBox}>
						{(data.chatContents.x, data.chatContents.y)}
					</div>
				</div>
			);
		default:
			return <></>;
	}
}

export default Chatbox;

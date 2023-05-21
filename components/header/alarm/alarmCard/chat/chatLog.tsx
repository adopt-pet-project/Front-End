import React, {useEffect, useRef, useState} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chat/chatLog.module.scss';
import Chatbox from './chatbox';
import {useRecoilState} from 'recoil';
import {AgaraChat} from '@/utils/recoil/recoilStore';

function ChatLog() {
	const [on, setOn] = useState(false);
	const [chatData, setChatData] = useRecoilState(AgaraChat);

	const bodyRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		setOn(true);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (bodyRef && bodyRef.current) {
				bodyRef.current.scrollIntoView({behavior: 'smooth', block: 'end'});
			}
		}, 10);
	}, [chatData]);
	return (
		<>
			<ul className={styles.chatBody}>
				{chatData.map((data, i) => (
					<Chatbox data={data} key={i} />
				))}
				<div ref={bodyRef}></div>
			</ul>
		</>
	);
}

export default ChatLog;

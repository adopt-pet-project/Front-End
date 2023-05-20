import React, {useEffect, useState} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/cardListWrap.module.scss';
import AlarmCard from './alarmCard';
import NoteCard from './noteCard';
import ChatCard from './chatCard';
import NoteLog from './noteLog';

function CardListWrap({
	ctgType,
	alarmData,
	noteData,
	chatData,
}: {
	ctgType: 0 | 1 | 2;
	alarmData: Alarmdata[];
	chatData: Chatdata[];
	noteData: Notedata[];
}) {
	const [isLogOn, setIsLogOn] = useState({id: 2, on: false, name: ''});
	useEffect(() => {
		console.log(isLogOn);
	}, [isLogOn]);
	return (
		<>
			<ul className={styles.listWrap}>
				{ctgType === 0
					? alarmData.map((data, i) => <AlarmCard key={i} data={data} />)
					: ctgType === 1
					? noteData.map((data, i) => (
							<NoteCard
								onClick={() => {
									setIsLogOn(prev => ({...prev, on: true, name: data.name}));
								}}
								setIsLogOn={setIsLogOn}
								key={i}
								data={data}
							/>
					  ))
					: chatData.map((data, i) => <ChatCard key={i} data={data} />)}
			</ul>
			{isLogOn.on ? (
				<NoteLog setIsLogOn={setIsLogOn} isLogOn={isLogOn} />
			) : null}
		</>
	);
}

export default CardListWrap;

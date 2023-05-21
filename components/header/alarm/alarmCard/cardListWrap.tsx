import React, {useEffect, useState} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/cardListWrap.module.scss';
import AlarmCard from './alarmCard';
import NoteCard from './noteCard';
import ChatCard from './chatCard';
import LogWrap from './logWrap';
import {useRecoilState} from 'recoil';
import {AalarmboxCtg, AnoteLog} from '@/utils/recoil/recoilStore';

function CardListWrap({
	alarmData,
	noteData,
	chatData,
}: {
	alarmData: Alarmdata[];
	chatData: Chatdata[];
	noteData: Notedata[];
}) {
	const [ctgType, setCtgType] = useRecoilState(AalarmboxCtg);
	const [isLogOn, setIsLogOn] = useRecoilState(AnoteLog);

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
								key={i}
								data={data}
							/>
					  ))
					: chatData.map((data, i) => (
							<ChatCard
								onClick={() => {
									setIsLogOn(prev => ({
										...prev,
										on: true,
										name: `${data.name}ㆍ${data.docTitle}`,
									}));
								}}
								key={i}
								data={data}
							/>
					  ))}
			</ul>
		</>
	);
}

export default CardListWrap;

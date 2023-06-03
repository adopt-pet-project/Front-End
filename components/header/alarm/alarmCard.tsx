import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard.module.scss';
import {useRecoilState} from 'recoil';
import {AalarmData, AisAlarmBoxOn} from '@/utils/recoil/recoilStore';
import {useRouter} from 'next/router';
import useFetch from '@/utils/hooks/useFetch';
import {convertDate} from '@/utils/functions/convertDate';

function AlarmCard({data}: {data: Alarmdata | Alarmdataname}) {
	const router = useRouter();
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	const [alarmData, setAlarmData] = useRecoilState(AalarmData);
	const [_, updateAlarmCheck] = useFetch(
		`/notification/checked/${data.id}`,
		'PATCH',
		true,
	);

	console.log(data.url);
	return (
		<div
			onClick={() => {
				updateAlarmCheck();
				setAlarmData(prev => {
					let result = [...prev];
					result = result.map((mapData, i) =>
						mapData.id === data.id ? {...mapData, checked: true} : mapData,
					);

					return result;
				});
				setIsAlarmBoxOn(false);
				router.push(`${data.url}`);
			}}
			className={`${styles.cardWrap} ${
				data.checked === false ? styles.checked : null
			} ${data.del ? styles.del : null}`}
		>
			<div className={styles.alarmType}>
				{data.type === 'announcement' ? (
					<span style={{color: 'green', fontWeight: 'bold'}}>@공지사항</span>
				) : data.type === 'documentHot' ? (
					<span style={{color: 'red', fontWeight: 'bold'}}>게시글 알림</span>
				) : data.type === 'comment' ? (
					<span style={{color: 'orange', fontWeight: 'bold'}}>댓글 알림</span>
				) : data.type === 'recomment' ? (
					<span style={{color: 'orange', fontWeight: 'bold'}}>답글 알림</span>
				) : data.type === 'chat' ? (
					<span style={{color: 'blue', fontWeight: 'bold'}}>채팅 알림</span>
				) : (
					<span style={{color: 'purple', fontWeight: 'bold'}}>쪽지 알림</span>
				)}
				<span>
					{convertDate(
						new Date(
							data.publishedAt[0],
							data.publishedAt[1] - 1,
							data.publishedAt[2],
							data.publishedAt[3],
							data.publishedAt[4],
							data.publishedAt[5],
						).getTime(),
					)}
				</span>
			</div>

			<div className={styles.explane}>
				{data.type === 'announcement' ? null : data.type === 'documentHot' ? (
					<>
						축하합니다. 회원님의 게시글이{' '}
						<span style={{color: 'red'}}>HOT</span>
						글에 선정되었습니다.
					</>
				) : data.type === 'comment' ? (
					`${data.name}님이 회원님의 게시글에 댓글을 작성하였습니다.`
				) : data.type === 'recomment' ? (
					`${data.name}님이 회원님의 댓글에 답글을 작성하였습니다.`
				) : data.type === 'chat' ? (
					`${data.name}님으로부터 채팅이 도착하였습니다.`
				) : data.type === 'note' ? (
					`${data.name}님으로부터 쪽지가 도착하였습니다.`
				) : null}
			</div>
			<div className={styles.alarmAnnounce}>
				{data.type === 'documentHot' ? null : `${data.content}`}
			</div>
		</div>
	);
}

export default AlarmCard;

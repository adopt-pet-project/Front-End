import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard.module.scss';

function AlarmCard({data}: {data: Alarmdata | Alarmdataname}) {
	return (
		<div
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
				<span>{data.date}</span>
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
				{data.type === 'documentHot' ? null : `${data.contents}`}
			</div>
		</div>
	);
}

export default AlarmCard;

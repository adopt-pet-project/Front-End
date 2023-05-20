import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/alarmCard.module.scss';

function AlarmCard({data}: {data: Alarmdata}) {
	return (
		<div className={styles.cardWrap}>
			<div className={styles.alarmType}>
				{data.type === 'announcement' ? (
					<span style={{color: 'green', fontWeight: 'bold'}}>@공지사항</span>
				) : data.type === 'documentHot' ? (
					<span style={{color: 'red', fontWeight: 'bold'}}>게시글 알림</span>
				) : data.type === 'comment' ? (
					<span
						style={{
							color: '#F7E600',
							fontWeight: 'bold',
						}}
					>
						댓글 알림
					</span>
				) : data.type === 'recomment' ? (
					<span
						style={{
							color: '#F7E600',
							fontWeight: 'bold',
						}}
					>
						답글 알림
					</span>
				) : data.type === 'mention' ? (
					<span style={{color: 'darkblue', fontWeight: 'bold'}}>멘션 알림</span>
				) : null}
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
					'성익현님이 회원님의 게시글에 댓글을 작성하였습니다.'
				) : data.type === 'recomment' ? (
					'성익현님이 회원님의 댓글에 답글을 작성하였습니다.'
				) : data.type === 'mention' ? (
					'성익현님이 회원님을 @언급하였습니다.'
				) : null}
			</div>
			<div className={styles.alarmAnnounce}>
				{data.type === 'documentHot' ? null : `${data.contents}`}
			</div>
		</div>
	);
}

export default AlarmCard;

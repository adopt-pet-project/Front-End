import {Map, MapMarker, useInjectKakaoMapApi} from 'react-kakao-maps-sdk';
import styles from '@/styles/components/chat/messageArea.module.scss';

const profile =
	'https://project-adopt-bucket.s3.ap-northeast-2.amazonaws.com/other/default-profile-image.jpeg';
export default function NewMessageArea({
	message,
	mine,
	authorId,
}: {
	message: Chat[];
	mine: boolean;
	authorId: number;
}) {
	return (
		<div className={styles.container}>
			{message.map((chat: Chat, index: number) => {
				chat.mine = chat.senderNo === authorId ? mine : !mine;
				let dateString = '';
				let coords =
					chat.contentType === 'coords'
						? chat.content.split(' ').map(Number)
						: null;

				if (index === message.length - 1) {
					dateString = `${chat.timeString}`;
				} else if (index === 0) {
					dateString = `${chat.dateString} ${chat.timeString}`;
				} else {
					if (message[index].dateString != message[index - 1].dateString)
						dateString += message[index].dateString;

					if (dateString != '') dateString += ' ';

					if (message[index].timeString != message[index + 1].timeString)
						dateString += message[index].timeString;
				}

				return (
					<div
						key={chat.sendTime}
						className={`${styles.message} ${
							chat.mine ? styles.me : styles.opponent
						}`}
					>
						<div
							className={`${styles.textContainer} ${
								chat.mine ? styles.rowReverse : ''
							}`}
						>
							{chat.contentType === 'picture' && (
								<div className={styles.multimedia}>
									<img
										style={{
											width: 'calc(100% - 12px)',
											height: 'calc(100% - 12px)',
											margin: '6px',
											borderRadius: '8px',
										}}
										src={chat.content}
									/>
								</div>
							)}

							{chat.contentType === 'coords' && (
								<div className={styles.multimedia}>
									<Map
										style={{
											width: 'calc(100% - 12px)',
											height: 'calc(100% - 12px)',
											margin: '6px',
											borderRadius: '8px',
										}}
										center={{
											lat: (coords as number[])[0],
											lng: (coords as number[])[1],
										}}
										level={3}
									>
										<MapMarker
											position={{
												lat: (coords as number[])[0],
												lng: (coords as number[])[1],
											}}
										/>
									</Map>
								</div>
							)}
							{(chat.contentType === 'text' || chat.contentType == null) && (
								<span className={styles.text}>{chat.content}</span>
							)}
							<span className={styles.time}>{dateString}</span>
						</div>
						{(index === 0 ||
							message[index - 1].mine !== message[index].mine) && (
							<div className={styles.profile}>
								<img src={`${profile}`} width={32} height={32} alt="profile" />
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

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
				const dateString =
					index === 0 ||
					message[index].dateString != message[index - 1].dateString
						? `${chat.dateString} ${chat.timeString}`
						: `${chat.timeString}`;
				return (
					<div
						key={chat.id}
						className={`${styles.message} ${
							chat.mine ? styles.me : styles.opponent
						}`}
					>
						<div
							className={`${styles.textContainer} ${
								chat.mine ? styles.rowReverse : ''
							}`}
						>
							<span className={styles.text}>{chat.content}</span>
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

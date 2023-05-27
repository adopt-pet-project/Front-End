import styles from '@/styles/components/chat/messageArea.module.scss';

const profile =
	'https://project-adopt-bucket.s3.ap-northeast-2.amazonaws.com/other/default-profile-image.jpeg';

export default function MessageArea({message}: {message: Chat[]}) {
	return (
		<div className={styles.container}>
			{message.map((chat: Chat, index: number) => {
				return (
					<div
						key={chat.sendDate}
						className={`${styles.message} ${
							chat.mine ? styles.me : styles.opponent
						}`}
					>
						<span className={styles.text}>{chat.content}</span>
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

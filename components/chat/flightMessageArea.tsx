import styles from '@/styles/components/chat/flightMessageArea.module.scss';

export default function FlightMessageArea({message}: {message: FlightChat[]}) {
	return (
		<div className={styles.container}>
			{message.map((chat: FlightChat, index: number) => {
				return (
					<div key={Date.now()} className={`${styles.message} ${styles.me}`}>
						<span className={styles.text}>{chat.content}</span>
					</div>
				);
			})}
		</div>
	);
}

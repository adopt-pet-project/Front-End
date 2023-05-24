import styles from '@/styles/components/chat/messageArea.module.scss';

const profile =
	'https://project-adopt-bucket.s3.ap-northeast-2.amazonaws.com/other/default-profile-image.jpeg';

const DummyChat = [
	{
		id: '646cb4fc6435c8700cb9b428',
		chatRoomNo: 1,
		senderNo: 1,
		senderName: '코린이',
		type: null,
		content: 'ㅎㅇ',
		sendDate: 1684845820682,
		readCount: 0,
		mine: false,
	},
	{
		id: '646cb61bbd8f2941ed30d883',
		chatRoomNo: 1,
		senderNo: 1,
		senderName: '코린이',
		type: null,
		content: 'ㅇㅇㅇㅇ',
		sendDate: 1684846107303,
		readCount: 0,
		mine: false,
	},
	{
		id: '646cb61bbd8f2941ed30d883',
		chatRoomNo: 1,
		senderNo: 1,
		senderName: '광인',
		type: null,
		content: '안녕하세요',
		sendDate: 1684846107403,
		readCount: 0,
		mine: true,
	},
];

for (let i = 0; i < 20; i++) {
	DummyChat.push({
		id: '646cb61bbd8f2941ed30d883',
		chatRoomNo: 1,
		senderNo: 1,
		senderName: '광인',
		type: null,
		content: '안녕하세요',
		sendDate: i,
		readCount: 0,
		mine: true,
	});
}

export default function MessageArea() {
	return (
		<div className={styles.container}>
			{DummyChat.map((chat: any, index: number) => {
				return (
					<div
						key={chat.sendDate}
						className={`${styles.message} ${
							chat.mine ? styles.me : styles.opponent
						}`}
					>
						<span className={styles.text}>{chat.content}</span>
						{(index === 0 ||
							DummyChat[index - 1].mine !== DummyChat[index].mine) && (
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

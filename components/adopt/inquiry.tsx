import {useRouter} from 'next/router';
import styles from '@/styles/components/adopt/inquiry.module.scss';

export default function Inquiry({
	authorId,
	id,
	chat,
	mine,
}: {
	authorId: number;
	id: number;
	chat: number;
	mine: boolean;
}) {
	const router = useRouter();

	async function fetchAdoptChatList() {
		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom?saleNo=${id}`,
			{
				headers: {
					Authorization: window.localStorage.getItem('accessToken') as string,
				},
			},
		);

		let result = await response.json();
		return result;
	}

	async function makeChat() {
		if (!window.localStorage.getItem('accessToken')) {
			dispatchEvent(new Event('fadeLogin'));
			return;
		}

		let myChat = await fetchAdoptChatList();
		if (myChat.length === 0) {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
					method: 'POST',
					body: JSON.stringify({createMember: authorId, saleNo: id}),
				},
			);
			let result = await response.json();
			if (result.status === 200) {
				let newChat = await fetchAdoptChatList();
				router.push(`/chat/${newChat[0].chatNo}?adoptId=${id}`);
			} else {
				alert(`Error Code ${result.status}`);
			}
		} else {
			let chatId = myChat[0].chatNo;
			if (chatId != null)
				router.push(`/chat/${myChat[0].chatNo}?adoptId=${id}`);
		}
	}

	return (
		<div className={styles.container}>
			{mine ? (
				<>
					<div>test</div>
					<div
						style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}
					>
						<button onClick={fetchAdoptChatList}>받은 문의 {chat}</button>
					</div>
				</>
			) : (
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<button>관심목록에 추가</button>
					<button onClick={makeChat}>문의하기</button>
				</div>
			)}
		</div>
	);
}

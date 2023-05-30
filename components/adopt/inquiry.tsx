import {useRouter} from 'next/router';
import {useState} from 'react';
import useRefreshToken from '@/utils/hooks/useRefreshToken';
import styles from '@/styles/components/adopt/inquiry.module.scss';
import {convertDate} from '@/utils/functions/convertDate';

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
	const [chatList, setChatList] = useState<ChatList[]>([]);
	const refresh = useRefreshToken();
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
		if (result.status === 401) {
			refresh();
			alert('다시 시도하세요.');
		} else if (!result.status) {
			setChatList(result);
		} else {
			alert('오류 발생');
		}
		return result;
	}

	async function addBookmark() {
		if (!window.localStorage.getItem('accessToken')) {
			dispatchEvent(new Event('fadeLogin'));
			return;
		}
		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/bookmark/${id}`,
			{
				method: 'POST',
				headers: {
					Authorization: window.localStorage.getItem('getItem') as string,
				},
			},
		);

		let result = await response.json();

		if (result.status === 200) {
			alert('추가되었습니다.');
		} else if (result.status === 401) {
			refresh();
			alert('다시 시도하세요.');
		} else {
			alert(`error : ${result.status}`);
		}
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
					{mine && chatList.length !== 0 && (
						<div className={styles.chatList}>
							{chatList
								.filter((chat: ChatList) => chat.latestMessage != null)
								.map((chat: ChatList) => {
									return (
										<div
											key={chat.regDate}
											className={styles.chat}
											onClick={() => {
												router.push(`/chat/${chat.chatNo}?adoptId=${id}`);
											}}
										>
											<img
												src={chat.participant.profile}
												width={64}
												height={64}
												alt="profile"
											/>
											<div className={styles.chatInfo}>
												<div className={styles.upper}>
													<span className={styles.strong}>
														{chat.participant.username}
													</span>{' '}
													<span>{convertDate(chat.latestMessage.sendAt)}</span>
												</div>
												<span className={styles.lower}>
													{chat.latestMessage.context}
												</span>
											</div>
										</div>
									);
								})}
						</div>
					)}
					<div
						style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}
					>
						<button onClick={fetchAdoptChatList}>받은 문의 {chat}</button>
					</div>
				</>
			) : (
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<button onClick={addBookmark}>관심목록에 추가</button>
					<button onClick={makeChat}>문의하기</button>
				</div>
			)}
		</div>
	);
}

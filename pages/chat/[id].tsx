import {GetServerSideProps} from 'next';
import {ReactElement, useEffect, useRef, useState} from 'react';
import {CompatClient, IMessage, Stomp, StompSubscription} from '@stomp/stompjs';
import {useRouter} from 'next/router';
import SockJS from 'sockjs-client';
import ChatInput from '@/components/chat/chatInput';
import AdoptInfo from '@/components/chat/adoptInfo';
import Header from '@/components/chat/header';
import MessageArea from '@/components/chat/messageArea';
import Layout from '@/components/layout/layout';
import Divider from '@/components/chat/divider';
import FlightMessageArea from '@/components/chat/flightMessageArea';
import useRefreshToken from '@/utils/hooks/useRefreshToken';
import NewMessageArea from '@/components/chat/newMessageArea';

export default function Chat({query}: {query: any}) {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [message, setMessage] = useState<Chat[]>([]);
	const [flightMessage, setFlightMessage] = useState<FlightChat[]>([]);
	const [adoptInfo, setAdoptInfo] = useState<AdoptDetail>();
	const [newMessage, setNewMessage] = useState<Chat[]>([]);
	const client = useRef<CompatClient>();
	const subscribe = useRef<StompSubscription>();
	const isMine = useRef<boolean>(false);
	const newMessageRef = useRef<Chat[]>([]);
	const messageRef = useRef<Chat[]>([]);
	const email = useRef<string>('');
	const router = useRouter();
	const refresh = useRefreshToken();

	function handleMessage(msg: IMessage) {
		const body: Chat = JSON.parse(msg.body);
		const opponentRead =
			body.readCount === 0 &&
			(body.senderNo === Number(adoptInfo?.author.id)
				? isMine.current
				: !isMine.current);

		if (
			body.readCount === 0 &&
			(body.senderNo === Number(adoptInfo?.author.id)
				? isMine.current
				: !isMine.current)
		) {
			// 새 메시지 읽음여부 갱신 state 갱신은 뒤에서 같이 처리
			newMessageRef.current = newMessageRef.current.map((chat: Chat) => {
				return {...chat, readCount: 0};
			});

			// 기존 메시지 읽음여부 갱신
			messageRef.current = messageRef.current.map((chat: Chat) => {
				return {...chat, readCount: 0};
			});

			setMessage(messageRef.current);
		}

		fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/notification`, {
			headers: {'Content-Type': 'application/json'},
			method: 'POST',
			body: JSON.stringify({...body, senderEmail: email.current}),
		});

		const DATE = new Date(
			((body.sendDate || body.sendTime) as number) -
				new Date().getTimezoneOffset() * 60 * 1000,
		);

		body.dateString = `${(DATE.getMonth() + 1)
			.toString()
			.padStart(2, '0')}/${DATE.getDate().toString().padStart(2, '0')}`;
		body.timeString =
			DATE.getHours() < 12
				? `오전 ${DATE.getHours()
						.toString()
						.padStart(2, '0')}:${DATE.getMinutes().toString().padStart(2, '0')}`
				: `오후 ${(DATE.getHours() - 12)
						.toString()
						.padStart(2, '0')}:${DATE.getMinutes()
						.toString()
						.padStart(2, '0')}`;
		newMessageRef.current = [...newMessageRef.current, body];
		setNewMessage(newMessageRef.current);
	}

	function onConnect() {
		if (client.current) {
			client.current.onDisconnect = () => {
				fetch(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/${query.id}?email=${email.current}`,
					{
						method: 'POST',
						keepalive: true,
					},
				);
			};
			subscribe.current = client.current.subscribe(
				`/subscribe/public/${query.id}`,
				handleMessage,
				{
					Authorization: window.localStorage.getItem('accessToken') as string,
				},
			);
			setIsConnected(true);
		}
	}

	function onError(e: IMessage) {
		alert(e.headers.message);
	}

	useEffect(() => {
		async function fetchMessage() {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/${query.id}`,
				{
					headers: {
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
				},
			);

			let result = await response.json();
			if (!result.status) {
				const msg: Chat[] = result.chatList || [];
				email.current = result.email;
				msg.forEach((message: Chat) => {
					const DATE = new Date(
						((message.sendDate || message.sendTime) as number) -
							new Date().getTimezoneOffset() * 60 * 1000,
					);

					message.dateString = `${(DATE.getMonth() + 1)
						.toString()
						.padStart(2, '0')}/${DATE.getDate().toString().padStart(2, '0')}`;
					message.timeString =
						DATE.getHours() < 12
							? `오전 ${DATE.getHours()
									.toString()
									.padStart(2, '0')}:${DATE.getMinutes()
									.toString()
									.padStart(2, '0')}`
							: `오후 ${(DATE.getHours() - 12)
									.toString()
									.padStart(2, '0')}:${DATE.getMinutes()
									.toString()
									.padStart(2, '0')}`;
				});
				messageRef.current = msg;
				setMessage(messageRef.current);
			}
		}

		if (window.localStorage.getItem('accessToken')) fetchMessage();
	}, []);

	useEffect(() => {
		client.current = Stomp.over(() => {
			return new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat`, null, {
				transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
			});
		});
		client.current.connect(
			{
				Authorization: window.localStorage.getItem('accessToken') as string,
				chatRoomNo: query.id,
			},
			onConnect,
			onError,
		);

		function disconnectStomp() {
			fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/chatroom/${query.id}?email=${email.current}`,
				{
					method: 'POST',
					keepalive: true,
				},
			);
		}
		window.addEventListener('beforeunload', () => {
			disconnectStomp();
		});

		return () => {
			console.log('disconnected');
			subscribe.current?.unsubscribe({
				Authorization: window.localStorage.getItem('accessToken') as string,
				chatRoomNo: query.id,
			});
			client.current?.disconnect();
		};
	}, []);

	useEffect(() => {
		async function fetchAdoptDetail() {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/${query.adoptId}`,
				{
					headers: {
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
				},
			);
			let result = await response.json();
			if (!result.status) {
				setAdoptInfo(result);
				isMine.current = result.mine;
			} else if (result.status === 401) {
				await refresh();
			} else {
				alert(`error : ${result.status}`);
			}
		}
		fetchAdoptDetail();
	}, []);

	return (
		<>
			<AdoptInfo adoptInfo={adoptInfo} />
			<section className="body" style={{zIndex: '101'}}>
				<Header />
				<div style={{flexGrow: 1}}>
					<MessageArea message={message} />
					{newMessage.length !== 0 && (
						<>
							{message.length !== 0 && <Divider />}
							{adoptInfo && (
								<NewMessageArea
									message={newMessage}
									mine={isMine.current}
									authorId={Number(adoptInfo?.author.id)}
								/>
							)}
						</>
					)}
					{flightMessage.length !== 0 && (
						<FlightMessageArea message={flightMessage} />
					)}
				</div>
				{client.current && isConnected && (
					<ChatInput client={client} id={Number(query.id)} />
				)}
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	return {
		props: {query},
	};
};

Chat.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

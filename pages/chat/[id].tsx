import {GetServerSideProps} from 'next';
import {ReactElement, useEffect, useRef, useState} from 'react';
import ChatInput from '@/components/chat/chatInput';
import AdoptInfo from '@/components/chat/adoptInfo';
import Header from '@/components/chat/header';
import MessageArea from '@/components/chat/messageArea';
import Layout from '@/components/layout/layout';
import {CompatClient, IMessage, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function Chat({query}: {query: any}) {
	const client = useRef<CompatClient>();

	const [message, setMessage] = useState<Chat[]>([]);

	const [newMessage, setNewMessage] = useState<Chat[]>([]);

	function onConnect() {
		if (client.current) {
			client.current.subscribe(
				`/subscribe/public/${query.id}`,
				(message: IMessage) => {
					console.log(message);
				},
			);
		}
	}
	function onError() {
		alert('error');
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
			if (!result.status) setMessage(result);
			console.log(result);
		}

		if (window.localStorage.getItem('accessToken')) fetchMessage();
	}, []);

	useEffect(() => {
		client.current = Stomp.over(() => {
			return new SockJS('https://ez-tour.org/chat');
		});

		client.current.connect(
			{
				Authorization: window.localStorage.getItem('accessToken') as string,
			},
			onConnect,
			onError,
		);
	}, []);

	return (
		<>
			<AdoptInfo />
			<section className="body" style={{zIndex: '101'}}>
				<Header />
				<MessageArea message={message} />
				{client.current && <ChatInput client={client} id={Number(query.id)} />}
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	// 채팅방 ID로 분양정보 조회
	// {
	//  title: "진돗개 한마리 분양합니다.".
	//  image: 'http://~~~~',
	//  address: '서울특별시 서초구',
	// }
	// let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt`);
	// let result = await response.json();

	return {
		props: {query},
	};
};

Chat.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

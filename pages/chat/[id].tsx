import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import ChatInput from '@/components/chat/chatInput';
import AdoptInfo from '@/components/chat/adoptInfo';
import Header from '@/components/chat/header';
import MessageArea from '@/components/chat/messageArea';
import Layout from '@/components/layout/layout';

export default function Chat() {
	return (
		<>
			<AdoptInfo />
			<section className="body" style={{zIndex: '101'}}>
				<Header />
				<MessageArea />
				<ChatInput />
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
		props: {},
	};
};

Chat.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

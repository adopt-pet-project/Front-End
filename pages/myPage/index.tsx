import Layout from '@/components/layout/layout';
import React from 'react';
import {ReactElement} from 'react';
import Profile from '@/components/myPage/profile';
import MyPageCtg from '@/components/myPage/myPageCtg';
import {AcurrentMyPageCtg} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';
import NoteList from '@/components/myPage/noteList';
import ChatList from '@/components/myPage/chatList';

function MyPage() {
	const [currentCtg, setCurrentCtg] = useRecoilState(AcurrentMyPageCtg);
	return (
		<>
			<MyPageCtg />
			<section className="body">
				{currentCtg === 0 ? (
					<Profile />
				) : currentCtg === 1 ? (
					<NoteList />
				) : (
					<ChatList />
				)}
			</section>
		</>
	);
}

export default MyPage;

MyPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

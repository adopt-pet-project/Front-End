import Layout from '@/components/layout/layout';
import React from 'react';
import {ReactElement} from 'react';
import Profile from '@/components/myPage/profile';
import ProfileModify from '@/components/myPage/profileModify';

function MyPage() {
	return (
		<>
			<Profile />
			<ProfileModify />
		</>
	);
}

export default MyPage;

MyPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

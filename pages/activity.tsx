import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Header from '@/components/activity/header';
import ActivityCtg from '@/components/activity/activityCtg';
import ActivityCardList from '@/components/activity/activityCardList';

function Activity() {
	return (
		<>
			<Header type="활동내역" />
			<ActivityCtg />
			<ActivityCardList />
		</>
	);
}

export default Activity;

Activity.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

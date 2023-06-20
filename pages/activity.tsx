import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Header from '@/components/activity/header';
import ActivityCtg from '@/components/activity/activityCtg';
import ActivityCardList from '@/components/activity/activityCardList';
import styles from '@/styles/pages/activity.module.scss';

function Activity() {
	return (
		<section className="body">
			<Header type="활동내역" />
			<div className={styles.activeWrap}>
				<ActivityCtg />
				<ActivityCardList />
			</div>
		</section>
	);
}

export default Activity;

Activity.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

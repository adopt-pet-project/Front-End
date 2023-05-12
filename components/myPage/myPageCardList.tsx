import React from 'react';
import styles from '@/styles/components/myPage/myPageCardList.module.scss';

import MyPageCard from './myPageCard';

function MyPageCardList() {
	const DummyData: any[] = [];

	for (let i = 0; i < 9; i++) {
		DummyData.push({
			id: i,
			title: '타이틀',
			context: '본문',
			author: '김성태',
			view: 3,
			comment: 6,
			like: 2,
			publishedAt: '글쓴시간',
			thumb:
				'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		});
	}

	return (
		<ul className={styles.cardList}>
			{DummyData.map((data, i) => (
				<MyPageCard article={data} />
			))}
		</ul>
	);
}

export default MyPageCardList;

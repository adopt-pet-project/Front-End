import styles from '@/styles/components/chat/adoptInfo.module.scss';

const DummyData = {
	title: '진돗개 한마리 분양합니다.',
	image:
		'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
	species: '믹스견',
	address: '서울특별시 서초구',
};

export default function AdoptInfo({
	adoptInfo,
}: {
	adoptInfo: AdoptDetail | undefined;
}) {
	return (
		<div className={styles.container}>
			{adoptInfo && (
				<>
					{adoptInfo.imageList.length !== 0 && (
						<img
							src={adoptInfo.imageList[0].imgUrl}
							alt="animal image"
							width={64}
							height={64}
						/>
					)}
					<div className={styles.info}>
						<span className={styles.title}>{adoptInfo.header.title}</span>
						<span>
							{adoptInfo.metadata.species} · {adoptInfo.coords.address}
						</span>
					</div>
				</>
			)}
		</div>
	);
}

import Image from 'next/image';
import styles from '@/styles/components/adopt/article.module.scss';

const status = [
	{
		text: '분양 예약',
		backgroundColor: '#65d329',
		color: 'var(--white)',
	},
	{
		text: '분양 완료',
		backgroundColor: 'var(--black)',
		color: 'var(--white)',
	},
];

export default function Article({article}: {article: Adopt}) {
	return (
		<article
			className={styles.container}
			onClick={() => {
				if (article.id != null) window.location.href = `/adopt/${article.id}`;
			}}
		>
			{article.thumbnail && article.thumbnail === 'null' ? (
				<div className={styles.dummyThumbnails} />
			) : (
				<Image
					width={92}
					height={92}
					quality={75}
					loading="lazy"
					className={styles.thumbnail}
					src={article.thumbnail}
					alt={`${article.title} image`}
				/>
			)}

			<div className={styles.description}>
				<div className={styles.preview}>
					<div className={styles.titleContainer}>
						<span className={styles.title}>{article.title}</span>
						{article.status != 0 && (
							<div
								style={{
									backgroundColor: `${
										status[article.status - 1].backgroundColor
									}`,
									color: `${status[article.status - 1].color}`,
								}}
								className={styles.status}
							>
								{status[article.status - 1].text}
							</div>
						)}
					</div>
					<span className={styles.species}>{article.species}</span>
				</div>
				<div className={styles.metadata}>
					<span>{`${article.address} · ${article.publishedAt}`}</span>
					<ul className={styles.dataList}>
						<li>
							<img
								style={{marginTop: '2px', padding: '2px'}}
								src="/icon/star.svg"
								alt="bookmark"
							/>
							<span>{article.bookmark}</span>
						</li>
						<li>
							<img
								style={{marginTop: '2px'}}
								src="/icon/comment.svg"
								alt="chat"
							/>
							<span>{article.chat}</span>
						</li>
					</ul>
				</div>
			</div>
		</article>
	);
}

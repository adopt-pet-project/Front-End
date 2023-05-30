import React from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import styles from '@/styles/components/activity/activityCard.module.scss';

function ActivityCard({article}: {article: any}) {
	const router = useRouter();
	return (
		<li
			className={styles.card}
			onClick={() => {
				router.push(`/board/${article.id}`);
			}}
		>
			{article.thumb && article.thumb === 'null' ? (
				<div className={styles.dummyThumbnails} />
			) : (
				<Image
					width={92}
					height={92}
					quality={75}
					loading="lazy"
					className={styles.thumbnail}
					src={article.thumbnail}
					alt={`${article.title} thumbnail`}
				/>
			)}

			<div className={styles.description}>
				<div className={styles.preview}>
					<div className={styles.title}>
						<span>{article.title}</span>
					</div>

					<span className={styles.context}>{article.contents}</span>
				</div>
				<div className={styles.metadata}>
					<span>{`${article.publishedAt}`}</span>
					<ul className={styles.dataList}>
						<li>
							<img style={{marginTop: '2px'}} src="/icon/view.svg" alt="view" />
							<span>{article.views}</span>
						</li>
						<li>
							<img
								style={{marginTop: '2px'}}
								src="/icon/comment.svg"
								alt="comment"
							/>
							<span>{article.comment}</span>
						</li>
						<li>
							<img style={{padding: '2px'}} src="/icon/like.svg" alt="like" />
							<span>{article.like}</span>
						</li>
					</ul>
				</div>
			</div>
		</li>
	);
}

export default ActivityCard;

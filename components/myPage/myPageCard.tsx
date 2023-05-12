import React from 'react';
import Image from 'next/image';
import styles from '@/styles/components/myPage/myPageCard.module.scss';

function MyPageCard({article}: {article: any}) {
	return (
		<li className={styles.card}>
			{article.thumb && article.thumb === 'null' ? (
				<div className={styles.dummyThumbnails} />
			) : (
				<Image
					width={92}
					height={92}
					quality={75}
					loading="lazy"
					className={styles.thumbnail}
					src={article.thumb}
					alt={`${article.title} thumbnail`}
				/>
			)}

			<div className={styles.description}>
				<div className={styles.preview}>
					<div className={styles.title}>
						<span>{article.title}</span>
						<span>...</span>
					</div>

					<span className={styles.context}>{article.context}</span>
				</div>
				<div className={styles.metadata}>
					<span>{`${article.author} · ${article.publishedAt}`}</span>
					<ul className={styles.dataList}>
						<li>
							<img style={{marginTop: '2px'}} src="/icon/view.svg" alt="view" />
							<span>{article.view}</span>
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

export default MyPageCard;

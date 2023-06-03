import React from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/myPage/noteCard.module.scss';
import useFetch from '@/utils/hooks/useFetch';
import {useRecoilState} from 'recoil';
function NoteCard({
	data,
}: {
	data: {
		id: number;
		name: string;
		contents: string;
		publishedAt: string;
		checked: boolean;
		targetId: number;
		deleteStatus: 0 | 1;
	};
}) {
	const [_, fetchNote] = useFetch(`/note/checked/${data.id}`, 'PATCH', true);
	const router = useRouter();
	return (
		<li
			onClick={() => {
				fetchNote();
				router.push(`/myPage/noteLog/${data.id}/${data.name}/${data.targetId}`);
			}}
			className={styles.noteCard}
		>
			<div className={styles.name}>
				{data.name}{' '}
				{data.checked ? null : (
					<span style={{color: 'red'}}>{data.checked ? 'N' : null}</span>
				)}
			</div>

			<div className={styles.contents}>
				{data.deleteStatus === 1 ? null : data.contents}
			</div>

			<div className={styles.date}>{data.publishedAt}</div>
		</li>
	);
}

export default NoteCard;

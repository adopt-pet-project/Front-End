import React, {useEffect, useState} from 'react';
import NoteLogCard from './noteLogCard';
import styles from '@/styles/components/myPage/noteLog/noteLog.module.scss';
import useFetch from '@/utils/hooks/useFetch';
import {useRouter} from 'next/router';
import {
	AletterTarget,
	AmodalType,
	AmodalWrap,
	ArefetchNote,
} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';
function NoteLog() {
	const router = useRouter();
	const [modalRef, setModalRef] = useRecoilState(AmodalWrap);
	const [modalType, setModalType] = useRecoilState(AmodalType);
	const [letterTarget, setLetterTarget] = useRecoilState(AletterTarget);
	const [refetchNote, setRefetchNote] = useRecoilState(ArefetchNote);
	const [noteData, setNoteData] = useState<
		{
			id: number;
			mine: boolean;
			contents: string;
			publishedAt: string;
			deleteStatus: 0 | 1;
		}[]
	>([]);

	const [_, fetchNote] = useFetch(
		`/note/history/${router.query.id}`,
		'GET',
		true,
		data => {
			console.log(data);
			setNoteData(data);
		},
	);

	useEffect(() => {
		if (router.query.id) fetchNote();
	}, [router.query.id, refetchNote]);

	return (
		<div className={styles.noteLog}>
			{noteData.map((data, i) => (
				<NoteLogCard data={data} key={i} />
			))}
			<div
				onClick={() => {
					if (modalRef && modalRef.current) {
						modalRef.current.style.display = 'flex';
						setModalType('LetterModal');
						setLetterTarget({
							username: router.query.name as string,
							targetId: Number(router.query.target),
						});
					}
				}}
				className={styles.sendNote}
			>
				<img src="/icon/send.svg" alt="" />
			</div>
		</div>
	);
}

export default NoteLog;

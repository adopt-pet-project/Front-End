import styles from '@/styles/components/adopt/context.module.scss';
import {AmodalType, AmodalWrap} from '@/utils/recoil/recoilStore';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';

export default function Context({context}: {context: AdoptContext}) {
	const [isMine, setIsMine] = useState<Boolean>(false);

	const [modalRef, setModalRef] = useRecoilState(AmodalWrap);
	const [modalType, setModalType] = useRecoilState(AmodalType);

	useEffect(() => {
		setModalType('deleteModal');
	});

	const router = useRouter();
	useEffect(() => {
		async function fetchMine() {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/${router.query.id}`,
				{
					headers: {
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
				},
			);
			let result = await response.json();
			setIsMine(result.mine);
		}
		if (window.localStorage.getItem('accessToken') as string) fetchMine();
	}, []);

	return (
		<div className={styles.container}>
			<div style={{minHeight: '200px'}}>
				{context.context.split('\n').map((line: string, index: number) => {
					return (
						<span key={index}>
							{line}
							<br />
						</span>
					);
				})}
			</div>
			<div className={styles.info}>
				<div>
					<span>관심 {context.bookmark}</span>
					{' · '}
					<span>연락 {context.chat}</span>
				</div>
				{isMine && (
					<div>
						<Link
							className={styles.modify}
							href={`/adopt/modify/${router.query.id}`}
						>
							수정
						</Link>
						{' · '}
						<button
							className={styles.delete}
							onClick={() => {
								modalRef!.current!.style.display = 'flex';
							}}
						>
							삭제
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

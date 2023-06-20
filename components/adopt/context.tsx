import {useEffect} from 'react';
import Link from 'next/link';
import {useRecoilState} from 'recoil';
import {AmodalType, AmodalWrap} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/adopt/context.module.scss';

export default function Context({
	context,
	id,
	mine,
}: {
	context: AdoptContext;
	id: number;
	mine: boolean;
}) {
	const [modalRef, setModalRef] = useRecoilState(AmodalWrap);
	const [modalType, setModalType] = useRecoilState(AmodalType);

	useEffect(() => {
		setModalType('deleteModal');
	});

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
				{mine && (
					<div>
						<Link
							className={styles.modify}
							href={{pathname: '/adopt/modify/[id]', query: {id: id}}}
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

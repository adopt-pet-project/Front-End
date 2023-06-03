import {BaseSyntheticEvent, useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {AmodalWrap, AmodalType} from '@/utils/recoil/recoilStore';
import useRefreshToken from '@/utils/hooks/useRefreshToken';
import styles from '@/styles/components/board/more.module.scss';

const option = ['수정', '삭제'];

export default function More() {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isMine, setIsMine] = useState<number>(0);

	const [modalRef, setModalRef] = useRecoilState(AmodalWrap);
	const [modalType, setModalType] = useRecoilState(AmodalType);

	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const refresh = useRefreshToken();

	useEffect(() => {
		function onClickOutside(e: MouseEvent) {
			if (
				menuRef.current &&
				menuRef.current.contains(e.target as HTMLElement)
			) {
				setIsActive(!isActive);
			} else {
				setIsActive(false);
			}
		}

		window.addEventListener('click', onClickOutside);

		return () => {
			window.removeEventListener('click', onClickOutside);
		};
	}, []);

	useEffect(() => {
		async function fetchMine() {
			const id = router.query.id;
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/community/article/${id}`,
				{
					headers: {
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
				},
			);
			let result = await response.json();
			if (result.status == null) {
				setIsMine(result.mine ? 1 : 0);
			} else if (result.status === 401) {
			} else {
				alert('오류가 발생했습니다.');
			}
		}
		if (window.localStorage.getItem('accessToken')) fetchMine();
	}, []);

	function onClickItem(e: BaseSyntheticEvent) {
		switch (e.target.innerText) {
			case '수정':
				router.push(`/board/modify/${router.query.id}`);
				return;
			case '삭제':
				setModalType('deleteModal');
				modalRef!.current!.style.display = 'flex';
				return;
			default:
				return;
		}
	}

	return (
		<>
			{isMine === 1 && (
				<div
					className={styles.container}
					ref={containerRef}
					onClick={e => {
						e.stopPropagation();
						setIsActive(!isActive);
					}}
				>
					<img src="/icon/more.svg" />
				</div>
			)}
			{isActive && (
				<div ref={menuRef} className={styles.menu} onClick={onClickItem}>
					{option.map((opt: string) => {
						return (
							<span key={opt} className={styles.option}>
								{opt}
							</span>
						);
					})}
				</div>
			)}
		</>
	);
}

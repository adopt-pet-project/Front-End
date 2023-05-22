import styles from '@/styles/components/board/more.module.scss';
import {useEffect, useRef, useState} from 'react';

const option = [['쪽지'], ['수정', '삭제']];

export default function More() {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isMine, setIsMine] = useState<number>(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

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

	return (
		<>
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
			{isActive && (
				<div ref={menuRef} className={styles.menu}>
					{option[isMine].map((opt: string) => {
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

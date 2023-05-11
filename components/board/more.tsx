import styles from '@/styles/components/board/more.module.scss';
import {useEffect, useRef, useState} from 'react';

export default function More() {
	const [isActive, setIsActive] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.addEventListener('click', (e: MouseEvent) => {
			if (
				containerRef.current &&
				containerRef.current.contains(e.target as HTMLElement)
			) {
				setIsActive(!isActive);
			} else {
				setIsActive(false);
			}
		});

		return () => {
			window.removeEventListener('click', (e: MouseEvent) => {
				if (
					containerRef.current &&
					containerRef.current.contains(e.target as HTMLElement)
				) {
					setIsActive(!isActive);
				} else {
					setIsActive(false);
				}
			});
		};
	}, []);

	return (
		<div
			className={styles.container}
			ref={containerRef}
			onClick={() => {
				setIsActive(true);
			}}
		>
			<img src="/icon/more.svg" />
			{isActive && (
				<div ref={menuRef} className={styles.menu}>
					<span>유저에 따라 다르게</span>
				</div>
			)}
		</div>
	);
}

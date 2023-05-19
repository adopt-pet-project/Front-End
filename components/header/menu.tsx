import {RefObject, useEffect, useState} from 'react';
import styles from '@/styles/components/header/menu.module.scss';
import {useRouter} from 'next/router';

export default function Menu({
	asideRef,
}: {
	asideRef: RefObject<HTMLDivElement>;
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		if (asideRef.current != null && isOpen) {
			asideRef.current.removeAttribute('data-active');
			setIsOpen(false);
		}
	}, [router.asPath]);

	return (
		<div
			className={styles.menu}
			onClick={() => {
				if (asideRef.current != null) {
					isOpen
						? asideRef.current.removeAttribute('data-active')
						: asideRef.current.setAttribute('data-active', 'active');
				}
				setIsOpen(!isOpen);
			}}
		>
			{isOpen ? (
				<img className={styles.icon} src="/icon/close.svg" alt="" />
			) : (
				<img className={styles.icon} src="/icon/menu.svg" alt="" />
			)}
		</div>
	);
}

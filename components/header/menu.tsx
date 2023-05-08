import styles from '@/styles/components/header/menu.module.scss';
import {RefObject, useState} from 'react';

export default function Menu({asideRef}: {asideRef: RefObject<HTMLElement>}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
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
			{isOpen ? 'close' : 'open'}
		</div>
	);
}

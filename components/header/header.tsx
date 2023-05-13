import {RefObject} from 'react';
import Logo from './logo';
import Menu from './menu';
import Profile from './profile';
import styles from '@/styles/components/header/header.module.scss';

export default function Header({
	asideRef,
	containerRef,
}: {
	asideRef: RefObject<HTMLDivElement>;
	containerRef: RefObject<HTMLDivElement>;
}) {
	return (
		<header className={styles.header}>
			<Menu asideRef={asideRef} />
			<Logo />
			<Profile containerRef={containerRef} />
		</header>
	);
}

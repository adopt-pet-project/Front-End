import {RefObject} from 'react';
import Logo from './logo';
import Menu from './menu';
import Profile from './profile';
import styles from '@/styles/components/header/header.module.scss';

export default function Header({asideRef}: {asideRef: RefObject<HTMLElement>}) {
	return (
		<header className={styles.header}>
			<Menu asideRef={asideRef} />
			<Logo />
			<Profile />
		</header>
	);
}

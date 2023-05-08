import styles from '@/styles/components/header/header.module.scss';
import Logo from './logo';
import Menu from './menu';
import Profile from './profile';
import {RefObject} from 'react';

export default function Header({asideRef}: {asideRef: RefObject<HTMLElement>}) {
	return (
		<header className={styles.header}>
			<Menu asideRef={asideRef} />
			<Logo />
			<Profile />
		</header>
	);
}

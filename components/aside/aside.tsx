import {RefObject} from 'react';
import Nav from './nav';
import Footer from './footer';
import styles from '@/styles/components/aside/aside.module.scss';

export default function Aside({asideRef}: {asideRef: RefObject<HTMLElement>}) {
	return (
		<aside ref={asideRef} className={styles.aside}>
			<Nav />
			<Footer />
		</aside>
	);
}

import styles from '@/styles/components/aside/aside.module.scss';
import {RefObject} from 'react';

export default function Aside({asideRef}: {asideRef: RefObject<HTMLElement>}) {
	return (
		<aside ref={asideRef} className={styles.aside}>
			aside
		</aside>
	);
}

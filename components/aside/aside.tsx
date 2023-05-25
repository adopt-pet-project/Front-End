import {ForwardedRef, forwardRef} from 'react';
import Nav from './nav';
import Footer from './footer';
import styles from '@/styles/components/aside/aside.module.scss';

const Aside = forwardRef(
	(props: any, asideRef: ForwardedRef<HTMLDivElement>) => {
		return (
			<aside ref={asideRef} className={styles.aside}>
				<Nav />
				<Footer />
			</aside>
		);
	},
);

export default Aside;

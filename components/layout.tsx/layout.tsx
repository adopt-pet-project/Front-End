import {ReactElement, RefObject, useRef} from 'react';
import Aside from '../aside/aside';
import Header from '../header/header';
import ModalWrap from '../admin/modal/modalWrap';

export default function Layout({children}: {children: ReactElement}) {
	const asideRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

	return (
		<div className="layout">
			<Header asideRef={asideRef} />
			<Aside asideRef={asideRef} />
			<main className="main">
				<div className="container">{children}</div>
			</main>
		</div>
	);
}

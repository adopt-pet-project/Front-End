import {ReactElement, RefObject, useRef} from 'react';
import Aside from '../aside/aside';
import Header from '../header/header';

export default function Layout({children}: {children: ReactElement}) {
	const asideRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

	return (
		<>
			<div className="modal"></div>
			<div className="layout">
				<Header asideRef={asideRef} />
				<Aside asideRef={asideRef} />
				<main className="main">
					<div className="container">{children}</div>
				</main>
			</div>
		</>
	);
}

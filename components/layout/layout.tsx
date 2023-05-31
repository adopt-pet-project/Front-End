import {ReactElement, RefObject, useRef} from 'react';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';
import Aside from '../aside/aside';
import Header from '../header/header';
import ModalWrap from './modalWrap';
import {useInjectKakaoMapApi} from 'react-kakao-maps-sdk';

const queryClient = new QueryClient();

export default function Layout({children}: {children: ReactElement}) {
	const asideRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

	useInjectKakaoMapApi({
		appkey: `${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}`,
	});

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<div className="layout">
					<Header asideRef={asideRef} containerRef={containerRef} />
					<Aside asideRef={asideRef} />
					<main className="main">
						<div ref={containerRef} className="container">
							{children}
						</div>
					</main>
				</div>
				<ModalWrap />
			</RecoilRoot>
		</QueryClientProvider>
	);
}

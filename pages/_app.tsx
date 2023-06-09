import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {ReactElement, ReactNode} from 'react';
import NProgress from 'nprogress';
import Head from 'next/head';
import {Router} from 'next/router';
import '@/styles/nprogress.css';
import '@/styles/globals.css';
import '@/public/fonts/font.css';
import Script from 'next/script';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

NProgress.configure({
	showSpinner: false,
	minimum: 0.25,
	speed: 500,
});

Router.events.on('routeChangeStart', () => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});
Router.events.on('routeChangeError', () => {
	NProgress.done();
});

export default function App({Component, pageProps}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

	return getLayout(
		<>
			<Head>
				<title>Pet Hub</title>
				<meta name="description" content="Pet Hub" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services,clusterer&autoload=false`}
				strategy="beforeInteractive"
			/>

			<Component {...pageProps} />
		</>,
	);
}

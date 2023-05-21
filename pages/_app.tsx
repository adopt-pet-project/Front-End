import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {ReactElement, ReactNode, useEffect} from 'react';
import NProgress from 'nprogress';
import Head from 'next/head';
import ModalWrap from '@/components/layout/modalWrap';
import {Router} from 'next/router';
import '@/styles/nprogress.css';
import '@/styles/globals.css';
import '@/public/fonts/font.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

NProgress.configure({showSpinner: false});

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
				<title>Temporary</title>
				<meta name="description" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
				/>
			</Head>

			<ModalWrap />
			<Component {...pageProps} />
		</>,
	);
}

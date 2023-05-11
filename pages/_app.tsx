import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {ReactElement, ReactNode, useEffect} from 'react';
import {RecoilRoot, useRecoilState} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';
import Head from 'next/head';
import '@/styles/globals.css';
import '@/public/fonts/font.css';
import ModalWrap from '@/components/layout/modalWrap';

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

	return getLayout(
		<>
			<Head>
				<title>Temporary</title>
				<meta name="description" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<QueryClientProvider client={queryClient}>
				<RecoilRoot>
					<ModalWrap />
					<Component {...pageProps} />
				</RecoilRoot>
			</QueryClientProvider>
		</>,
	);
}

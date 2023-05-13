import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';

export default function Home() {
	return <>home</>;
}

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {},
	};
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

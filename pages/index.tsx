import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';

export default function Home(props: {str: string}) {
	return <>response from server : {props.str}</>;
}

// export const getServerSideProps: GetServerSideProps = async context => {
// 	let str = await (await fetch('http://3.36.132.160/hello')).text();

// 	return {
// 		props: {str},
// 	};
// };

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

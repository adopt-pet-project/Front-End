import {ReactElement, useEffect, useLayoutEffect} from 'react';
import Layout from '@/components/layout/layout';
import {useRouter} from 'next/router';

export default function LoginSuccess() {
	const router = useRouter();
	const code = router.query.code;

	useLayoutEffect(() => {
		console.log(code);
		close();
	}, []);
	return <></>;
}

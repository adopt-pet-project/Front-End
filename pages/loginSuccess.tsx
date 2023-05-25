import {useEffect} from 'react';
import {useRouter} from 'next/router';
import useRegister from '@/utils/hooks/useRegister';

export default function LoginSuccess() {
	const router = useRouter();
	const setRegister = useRegister();

	useEffect(() => {
		if (!router.isReady) return;

		const accessToken = router.query.accessToken as string;
		const email = router.query.email as string;
		const provider = router.query.email as string;
		if (accessToken) {
			window.localStorage.setItem('accessToken', accessToken);
		} else if (email && provider) {
			setRegister({
				email: router.query.email as string,
				provider: router.query.provider as string,
			});
		}
		close();
		window.open('/', '_self');
	}, [router.isReady]);
	return <></>;
}

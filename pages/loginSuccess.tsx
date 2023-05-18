import {useEffect} from 'react';

import {useRouter} from 'next/router';
import useRegister from '@/utils/hooks/useRegister';

export default function LoginSuccess() {
	const router = useRouter();
	const setRegister = useRegister();

	useEffect(() => {
		if (!router.isReady) return;

		const accessToken = router.query.accessToken;
		if (accessToken) {
			// 토큰 설정 로직
		} else {
			setRegister({
				email: router.query.email as string,
				provider: router.query.provider as string,
			});
		}
		close();
	}, [router.isReady]);
	return <></>;
}

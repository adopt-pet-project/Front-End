import {ReactElement, useEffect} from 'react';
import {useRouter} from 'next/router';

export default function RefreshToken() {
	const router = useRouter();
	useEffect(() => {
		async function refresh(token: string) {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/token/refresh`,
				{
					method: 'POST',
					headers: {Authorization: token},
				},
			);
			const result = await response.json();
			if (result.status === 200) {
				window.localStorage.setItem('accessToken', result.accessToken);
			} else {
				window.localStorage.removeItem('accessToken');
			}
			router.back();
		}
		const token = window.localStorage.getItem('accessToken');
		if (token) refresh(token);
		else {
			router.back();
		}
	}, []);
	return <></>;
}

RefreshToken.getLayout = function getLayout(page: ReactElement) {
	return <div>{page}</div>;
};

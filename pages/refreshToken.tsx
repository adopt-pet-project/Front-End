import {useEffect} from 'react';
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
		}

		function changeStorage() {
			alert('test');
			// router.push('');
		}

		window.addEventListener('storage', changeStorage);

		const token = window.localStorage.getItem('accessToken');
		if (token) refresh(token);
		else {
		}
		return () => {
			window.removeEventListener('storage', changeStorage);
		};
	}, []);
	return <></>;
}

RefreshToken.getLayout = function getLayout() {
	return <div></div>;
};

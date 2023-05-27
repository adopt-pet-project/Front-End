function useRefreshToken() {
	async function refreshToken(token: string) {
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

	function refresh() {
		let token = window.localStorage.getItem('accessToken');

		if (!token) return;

		refreshToken(token);
	}

	return refresh;
}

export default useRefreshToken;

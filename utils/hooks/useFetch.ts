import {useState} from 'react';
import useRefreshToken from './useRefreshToken';
const refresh = useRefreshToken();

/**
 *
 * @param endpoint REST를 찌를 엔드포인트
 * @param method 'GET' | 'POST' | 'PATCH' | 'DELETE' 메서드
 * @param token boolean 헤더에 토큰을 담을지 말지
 * @param callback REST결과를 받아서 실행할 콜백 함수 첫 번재 인자로 fetch결과를 받음
 * @returns
 */
function useFetch<FetchReturnType, BT>(
	endpoint: string,
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
	token: boolean,
	callback?: (fetchData: any) => any,
) {
	// 브라우저에서 토큰을 가져옴

	const [accessToken, setAccessToken] = useState(
		typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '',
	);

	/**
	 *
	 * @param body 데이터 패칭 시 body에 들어갈 내용
	 * @returns
	 */
	async function fetchAPI(body?: any) {
		let result: RT<FetchReturnType> | null = null;
		//fetch를 날릴 url
		let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`;
		//토큰 여부에 따라서 헤드에 토큰을 추가함
		let response: Response | null = null;

		token
			? (response = await fetch(`${URL}`, {
					method: method,
					headers: {
						'Content-Type': `application/json`,
						Authorization: `${accessToken}`,
					},
					body: JSON.stringify(body),
			  }))
			: (response = await fetch(`${URL}`, {
					method: method,
					body: JSON.stringify(body),
			  }));

		//fetch 이후 반납되는 데이터
		result = await response.json();
		if (result) {
			if (result.status === 401) {
				refresh();
				fetchAPI(body); // 토큰이 이상하면 페치 api를 다시 날림
				alert('다시 시도합니다.');
			} else if (result.status === 404) {
				alert('존재하지 않거나 삭제된 페이지');
			} else if (result.status === 500) {
				alert('서버 에러');
			}
		}

		callback ? callback(result) : null; // 패치 결과를 콜백에 인자로 전송함
		return await result;
	}
	return fetchAPI;
}

export default useFetch;

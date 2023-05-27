import {useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {AmodalWrap} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/deleteModal.module.scss';
import useRefreshToken from '@/utils/hooks/useRefreshToken';

export default function DeleteModal() {
	const [modalRef] = useRecoilState(AmodalWrap);
	const router = useRouter();

	const type = useRef<string>();
	const id = useRef<number>();

	const refresh = useRefreshToken();

	useEffect(() => {
		type.current = router.asPath.split('/')[1];
		id.current = Number(router.query.id);
	});

	async function onClickApply() {
		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/${
				type.current === 'board' ? 'community/article' : 'adopt'
			}/${id.current}`,
			{
				headers: {Authorization: localStorage.getItem('accessToken') as string},
				method: 'DELETE',
			},
		);
		if (modalRef && modalRef.current!) modalRef.current.style.display = 'none';
		let result = await response.json();
		if (result.status === 200) {
			router.push(`/${type.current}`);
		} else if (result.status === 401) {
			refresh();
			alert(`다시 시도해 주세요.`);
		} else {
			alert(`삭제 실패\n사유:${result.error}`);
			router.push(`/${type.current}`);
		}
	}

	return (
		<div
			onClick={e => {
				e.stopPropagation();
			}}
			className={styles.container}
		>
			<span>글을 삭제하시겠습니까?</span>
			<button onClick={onClickApply} className={styles.button}>
				확인
			</button>
		</div>
	);
}

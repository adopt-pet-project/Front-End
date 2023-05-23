import {useRef} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {AmodalWrap} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/deleteModal.module.scss';
import useDepsOnlyEffect from '@/utils/hooks/useDepsOnlyEffect';

export default function DeleteModal() {
	const [modalRef] = useRecoilState(AmodalWrap);
	const router = useRouter();
	router.push('');

	const type = useRef<string>();
	const id = useRef<number>();

	useDepsOnlyEffect(() => {
		type.current = router.asPath.split('/')[1];
		id.current = Number(router.query.id);
	}, [router.isReady]);

	async function onClickApply() {
		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/${type.current}/${id.current}`,
			{
				headers: {Authorization: localStorage.getItem('accessToken') as string},
				method: 'DELETE',
			},
		);
		modalRef!.current!.style.display = 'none';
		let result = await response.json();
		if (result.status === 200) {
			router.push(`/${type.current}`);
		} else {
			router.push('');
		}
	}

	return (
		<div
			onClick={e => {
				e.stopPropagation();
			}}
			className={styles.container}
		>
			<span>삭제하시겠습니까?</span>
			<button onClick={onClickApply} className={styles.button}>
				확인
			</button>
		</div>
	);
}

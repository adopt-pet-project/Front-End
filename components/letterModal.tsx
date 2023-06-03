import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {AletterTarget, AmodalWrap} from '@/utils/recoil/recoilStore';
import useRefreshToken from '@/utils/hooks/useRefreshToken';
import styles from '@/styles/components/letterModal.module.scss';
import {useRef} from 'react';

export default function LetterModal() {
	const [modalRef] = useRecoilState(AmodalWrap);
	const [letterTarget] = useRecoilState(AletterTarget);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const router = useRouter();
	const refresh = useRefreshToken();

	async function onClickApply() {
		if (!window.localStorage.getItem('accessToken')) {
			dispatchEvent(new Event('fadeLogin'));
			textareaRef.current!.value = '';
			if (modalRef && modalRef.current!)
				modalRef.current.style.display = 'none';

			return;
		}

		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/note/send`,
			{
				method: 'POST',
				headers: {
					Authorization: window.localStorage.getItem('accessToken') as string,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					targetId: letterTarget.targetId,
					contents: textareaRef.current?.value,
				}),
			},
		);

		textareaRef.current!.value = '';
		if (modalRef && modalRef.current!) modalRef.current.style.display = 'none';

		let result = await response.json();
		if (result.status === 200) {
			alert('쪽지를 전송했습니다.');
		} else if (result.status === 401) {
			refresh();
			alert(`다시 시도해 주세요.`);
		} else {
			alert(`전송 실패\n사유:${result.error}`);
		}
	}

	return (
		<div
			onClick={e => {
				e.stopPropagation();
			}}
			className={styles.container}
		>
			<span>받는 사람 : {letterTarget.username}</span>
			<textarea ref={textareaRef}></textarea>
			<button onClick={onClickApply} className={styles.button}>
				전송
			</button>
		</div>
	);
}

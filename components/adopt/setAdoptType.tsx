import styles from '@/styles/components/adopt/setAdoptType.module.scss';
import {AmodalWrap} from '@/utils/recoil/recoilStore';
import {useRouter} from 'next/router';
import {useRef} from 'react';
import {useRecoilState} from 'recoil';

export default function SetAdoptType() {
	const [modalRef] = useRecoilState(AmodalWrap);
	const selectRef = useRef<HTMLSelectElement>();
	const router = useRouter();

	function onClickApply() {
		modalRef!.current!.style.display = 'none';
		router.push(`/adopt/new?type=${selectRef.current?.value}`);
	}

	return (
		<div
			onClick={e => {
				e.stopPropagation();
			}}
			className={styles.container}
		>
			<span>카테고리를 선택 해 주세요.</span>
			<select className={styles.selector}>
				<option value="dog">강아지</option>
				<option value="cat">고양이</option>
				<option value="etc">기타</option>
			</select>
			<button onClick={onClickApply} className={styles.button}>
				확인
			</button>
		</div>
	);
}

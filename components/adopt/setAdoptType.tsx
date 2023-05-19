import styles from '@/styles/components/adopt/setAdoptType.module.scss';
import {AmodalWrap} from '@/utils/recoil/recoilStore';
import {useRouter} from 'next/router';
import {BaseSyntheticEvent, useState} from 'react';
import {useRecoilState} from 'recoil';

export default function SetAdoptType() {
	const [modalRef] = useRecoilState(AmodalWrap);
	const [currentType, setCurrentType] = useState<string>('강아지');
	const [isVisibleOption, setIsVisibleOption] = useState<boolean>(false);
	const router = useRouter();

	function onClickApply() {
		modalRef!.current!.style.display = 'none';
		router.push(`/adopt/new?type=${currentType}`);
	}

	function onClickOption(e: BaseSyntheticEvent) {
		if (e.target.nodeName != 'DIV') setCurrentType(e.target.innerText);
	}

	return (
		<div
			onClick={e => {
				e.stopPropagation();
			}}
			className={styles.container}
		>
			<div
				style={{
					flexGrow: '1',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<span style={{fontWeight: 'bold'}}>카테고리를 선택 해 주세요.</span>

				<ul
					className={styles.selector}
					onClick={() => {
						setIsVisibleOption(!isVisibleOption);
					}}
				>
					<span style={{fontWeight: 'bold'}}>{currentType}</span>
					<img
						src="/icon/triangle.svg"
						alt=""
						width={10}
						height={10}
						style={{
							transform: `${
								isVisibleOption ? 'rotate(360deg)' : 'rotate(180deg)'
							}`,
							transition: 'var(--transition)',
						}}
					/>

					{isVisibleOption && (
						<div onClick={onClickOption} className={styles.options}>
							<li className={styles.option}>강아지</li>
							<li className={styles.option}>고양이</li>
							<li className={styles.option}>기타</li>
						</div>
					)}
				</ul>
			</div>
			<button onClick={onClickApply} className={styles.button}>
				확인
			</button>
		</div>
	);
}

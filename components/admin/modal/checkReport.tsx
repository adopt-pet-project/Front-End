import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {AisSelectTime, AmodalWrap} from '@/utils/recoil/recoilStore';
import SelectTime from './selectTime';
import styles from '@/styles/components/admin/modal/checkReport.module.scss';

function CheckReport() {
	const [isSelectTime, setIsSelectTime] = useRecoilState(AisSelectTime);
	const [option, setOption] = useState<'차단' | '제한'>('차단');
	const [isModalWrap, setIsModalWrap] = useRecoilState(AmodalWrap);

	return (
		<form
			onClick={e => {
				e.stopPropagation();
			}}
			className={styles.reportBox}
		>
			<div className={styles.line}>
				<div>신고자</div>
				<div>성익현</div>
			</div>
			<hr />
			<div className={styles.line}>
				<div>대상</div>
				<div>홍길동</div>
			</div>
			<hr />
			<div className={styles.line}>
				<div>날짜</div>
				<div>2023. 5. 3</div>
			</div>
			<hr />
			<div className={styles.line}>
				<div>분류</div>
				<div>게시글</div>
			</div>
			<hr />
			<div className={styles.line}>
				<div>컨텐츠내용</div>
				<div>나루토 사스케 싸움 수준 실화냐 진짜 가슴이 웅장해진다</div>
			</div>
			<hr />
			<div className={styles.line}>
				<div>사유</div>
				<div>음란물 기재</div>
			</div>
			<hr />
			<div className={styles.line}>
				<div>신고내용</div>
				<div>이 사람 계속 이상한거 올려요;</div>
			</div>
			<hr />
			<div>
				<button
					onClick={e => {
						e.preventDefault();
						if (isModalWrap && isModalWrap.current) {
							isModalWrap.current.style.display = 'none';
						}
					}}
					className={styles.cancelBtn}
				>
					취소
				</button>
				<div>
					<button
						type="submit"
						className={styles.blockBtn}
						onClick={e => {
							e.preventDefault();
							setOption('차단');
							setIsSelectTime(true);
						}}
					>
						접속차단
					</button>
					<button
						type="submit"
						className={styles.blockBtn}
						onClick={e => {
							e.preventDefault();
							setOption('제한');
							setIsSelectTime(true);
						}}
					>
						작성제한
					</button>
				</div>
			</div>

			{isSelectTime ? <SelectTime option={option} /> : null}
		</form>
	);
}

export default CheckReport;

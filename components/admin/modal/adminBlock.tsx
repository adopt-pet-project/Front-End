import React, {useState} from 'react';
import styles from '@/styles/components/admin/admin.module.scss';
import {AisAdminModalOn, AisSelectTime} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';
import SelectTime from './selectTime';

function AdminBlock() {
	const [_, setIsModal] = useRecoilState(AisAdminModalOn);
	const [isSelectTime, setIsSelectTime] = useRecoilState(AisSelectTime);
	const [option, setOption] = useState<'차단' | '제한'>('차단');
	return (
		<form
			onClick={e => {
				e.stopPropagation();
			}}
			className={styles.adminBlock}
		>
			<div>
				<span>대상</span>
				<span>성익현</span>
			</div>
			<hr />
			<div>
				<label htmlFor="cause">사유</label>
				<input
					name="cause"
					id="cause"
					placeholder="사유를 입력하세요"
					type="text"
				/>
			</div>
			<hr />
			<div>
				<label htmlFor="content">내용</label>
				<textarea name="content" id="content"></textarea>
			</div>
			<hr />
			<div>
				<button
					onClick={() => {
						setIsModal(false);
					}}
					className={styles.cancelBtn}
				>
					취소
				</button>
				<div>
					<button
						type="submit"
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

export default AdminBlock;

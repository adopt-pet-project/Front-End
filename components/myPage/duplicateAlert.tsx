import {AuserInfo} from '@/utils/recoil/recoilStore';
import React from 'react';
import {useRecoilState} from 'recoil';
import styles from '@/styles/components/myPage/duplicateAlert.module.scss';

function DuplicateAlert({
	already,
	newName,
	setNewName,
	setCurrentName,
	setInputState,
	setGetCheck,
	setCheckAlert,
}: {
	already: boolean;
	newName: string;
	setCurrentName: React.Dispatch<React.SetStateAction<string | null>>;
	setInputState: React.Dispatch<
		React.SetStateAction<{
			modify: boolean;
			view: boolean;
			already: boolean;
		}>
	>;
	setNewName: React.Dispatch<React.SetStateAction<string>>;
	setGetCheck: React.Dispatch<React.SetStateAction<boolean>>;
	setCheckAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [userInfo, setUserInfo] = useRecoilState(AuserInfo);

	return already ? (
		<div className={styles.checkWrap}>
			<span className={styles.checkName}>이 닉네임으로 하시겠습니까?</span>
			<button
				className={styles.checkBtn}
				onClick={e => {
					e.stopPropagation();
					setGetCheck(true);
					setCheckAlert(false);
					setCurrentName(newName);
					setInputState({
						modify: false,
						view: false,
						already: false,
					});
				}}
			>
				네
			</button>
			<button
				className={styles.checkBtn}
				onClick={e => {
					e.stopPropagation();
					setCurrentName(userInfo.name);
					setNewName(userInfo.name);
					setInputState({
						modify: false,
						view: false,
						already: false,
					});
				}}
			>
				아니요
			</button>
		</div>
	) : (
		<span className={`${styles.checkName} ${styles.already}`}>
			이미 존재하는 닉네임입니다.
		</span>
	);
}

export default DuplicateAlert;

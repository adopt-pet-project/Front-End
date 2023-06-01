import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/myPage/profile.module.scss';
import {useRecoilState} from 'recoil';
import {AuserInfo} from '@/utils/recoil/recoilStore';
import useFetch from '@/utils/hooks/useFetch';

function Profile() {
	const router = useRouter();
	const [isModify, setIsModify] = useState(false);
	const [currentName, setCurrentName] = useState('');
	const [newName, setNewName] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);
	const inputImgRef = useRef<HTMLInputElement>(null);
	const [userInfo, setUserInfo] = useRecoilState(AuserInfo);
	const [currentImg, setCurrentImg] = useState('');
	const [_1, withDraw] = useFetch('/member', 'DELETE', true);
	const [_2, checkName] = useFetch(
		`/member/validate?nickname=${newName}`,
		'GET',
		true,
		data => {
			console.log('this' + data);
		},
	);

	useEffect(() => {
		setCurrentImg(userInfo.profile);
		setCurrentName(userInfo.name);
		setNewName(userInfo.name);
	}, [userInfo]);

	useEffect(() => {
		isModify === true ? inputRef.current?.focus() : null;
	}, [isModify]);
	return (
		<>
			<div className={styles.profileWrap}>
				<div className={styles.imgWrap}>
					<img
						className={styles.profileImg}
						src={currentImg}
						alt="프로필 이미지"
					/>
					<label htmlFor="profileInput" className={styles.hoverWrap}>
						<div className={styles.imageBtn}>수정</div>
					</label>

					<input
						ref={inputImgRef}
						onInput={e => {
							console.log(e.currentTarget.files);
							if (inputImgRef.current) {
								const file = inputImgRef?.current?.files![0];
								const reader = new FileReader();
								reader.readAsDataURL(file);
								reader.onloadend = () => {
									setCurrentImg(reader.result as string);
								};
							}
						}}
						id="profileInput"
						accept="image/*"
						className={styles.fileInput}
						type="file"
					/>
				</div>

				<div className={styles.profileInfo}>
					<h1
						className={styles.name}
						onClick={() => {
							setIsModify(true);
						}}
					>
						{isModify ? (
							<input
								value={newName}
								ref={inputRef}
								type="text"
								onChange={e => {
									setNewName(e.target.value);
								}}
								onBlur={() => {
									setNewName(currentName);
									setIsModify(false);
								}}
								onKeyUp={e => {
									console.log(e.code);
									if (e.code === 'Enter') {
										checkName();
										setCurrentName(newName);
										setIsModify(false);
									} else if (e.code === 'Escape') {
										setNewName(currentName);
										setIsModify(false);
									}
								}}
							/>
						) : (
							`${newName}`
						)}
					</h1>
					<p>{userInfo.location}</p>
					<p></p>
					<button className={styles.saveBtn}>저장</button>
				</div>
			</div>
			<div className={styles.buttonWrap}>
				<button
					onClick={() => {
						withDraw();
						router.push('/');
					}}
				>
					계정탈퇴
				</button>
			</div>
		</>
	);
}

export default Profile;

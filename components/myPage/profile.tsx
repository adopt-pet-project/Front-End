import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/myPage/profile.module.scss';
import {useRecoilState} from 'recoil';
import {AuserInfo} from '@/utils/recoil/recoilStore';
import useFetch from '@/utils/hooks/useFetch';

function Profile() {
	const router = useRouter();

	const [inputState, setInputState] = useState<{
		modify: boolean;
		view: boolean;
		already: boolean;
	}>({modify: false, view: false, already: false});

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
			setInputState({modify: true, view: true, already: data.duplicated});
		},
	);

	useEffect(() => {
		setCurrentImg(userInfo.profile);
		setCurrentName(userInfo.name);
		setNewName(userInfo.name);
	}, [userInfo]);

	useEffect(() => {
		inputState.modify ? inputRef.current?.focus() : null;
	}, [inputState]);
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
							setInputState({modify: true, view: false, already: false});
						}}
					>
						{inputState.modify ? (
							<>
								<input
									value={newName}
									ref={inputRef}
									type="text"
									onChange={e => {
										setNewName(e.target.value);
									}}
									onKeyUp={e => {
										console.log(e.code);
										if (e.code === 'Enter') {
											//엔터를 눌렀을 때
											if (newName.trim() !== userInfo.name) {
												checkName(); // 이름 확인 절차
												setInputState(prev => ({...prev, view: true})); // 보이게
											} else {
												setInputState({
													modify: false,
													view: false,
													already: false,
												});
											}
										} else if (e.code === 'Escape') {
											setNewName(currentName);
											setInputState({
												modify: false,
												view: false,
												already: false,
											});
										}
									}}
								/>
								{inputState.view && _2 === 'end' ? (
									inputState.already ? (
										<span className={`${styles.checkName} ${styles.already}`}>
											이미 존재하는 닉네임입니다.
										</span>
									) : (
										<>
											<span className={styles.checkName}>
												이 닉네임으로 하시겠습니까?
											</span>
											<button
												onClick={e => {
													e.stopPropagation();
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
										</>
									)
								) : null}
							</>
						) : (
							<>
								{newName}{' '}
								<span style={{fontSize: '15px', color: 'var(--skyblue)'}}>
									클릭해서 변경
								</span>
							</>
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

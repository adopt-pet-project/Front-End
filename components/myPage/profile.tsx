import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/myPage/profile.module.scss';
import {useRecoilState} from 'recoil';
import {AuserInfo} from '@/utils/recoil/recoilStore';
import useFetch from '@/utils/hooks/useFetch';
import DuplicateAlert from './duplicateAlert';
import ImageUploader from '../imageUploader';
import useRefreshToken from '@/utils/hooks/useRefreshToken';

function Profile() {
	const router = useRouter();

	const [inputState, setInputState] = useState<{
		modify: boolean;
		view: boolean;
		already: boolean;
	}>({modify: false, view: false, already: false});

	const refresh = useRefreshToken();
	const [currentName, setCurrentName] = useState<string | null>('');
	const [newName, setNewName] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const inputImgRef = useRef<HTMLInputElement>(null);
	const [userInfo, setUserInfo] = useRecoilState(AuserInfo);
	const [currentImg, setCurrentImg] = useState('');
	const [getCheck, setGetCheck] = useState(false);
	const [returnValue, setReturnValue] = useState<{
		id: number | null;
		url: string | null;
	}>({
		id: null,
		url: null,
	});
	const accessToken = useRef(
		typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '',
	);
	const [checkAlert, setCheckAlert] = useState(false);
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

	async function fetchImage(file: File) {
		let formData = new FormData();
		formData.append('file', file);
		formData.append('type', 'profile');
		const data = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/image`,
			{
				method: 'POST',
				headers: {
					Authorization: window.localStorage.getItem('accessToken') as string,
				},
				body: formData,
			},
		);

		const returnValue = await data.json();
		setReturnValue({id: returnValue.data.id, url: returnValue.data.url});
	}

	async function saveImage() {
		let sendName: string | null = '';
		if (currentName === userInfo.name) {
			sendName = null;
		} else {
			sendName = currentName;
		}

		const body = returnValue.url
			? {
					name: sendName,
					image: {imageUrl: returnValue.url, imageKey: returnValue.id},
			  }
			: {name: sendName};

		const fetchImage = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/member`,
			{
				method: 'PATCH',

				headers: {
					Authorization: window.localStorage.getItem('accessToken') as string,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			},
		);
		let result = await fetchImage.json();
		if (result.status === 200) {
			alert('저장이 완료되었습니다.');
			router.reload();
		} else if (result.status === 401) {
			refresh();
			alert('다시 시도해 주세요');
		} else {
			alert('저장 실패');
		}
	}
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
								fetchImage(inputImgRef?.current?.files![0]);
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
										setGetCheck(false);
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
												setGetCheck(false);
											}
										} else if (e.code === 'Escape') {
											setNewName(currentName!);
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
										<DuplicateAlert
											newName={newName}
											setCurrentName={setCurrentName}
											setInputState={setInputState}
											setNewName={setNewName}
											setGetCheck={setGetCheck}
											setCheckAlert={setCheckAlert}
											already={false}
										/>
									) : (
										<DuplicateAlert
											newName={newName}
											setCurrentName={setCurrentName}
											setInputState={setInputState}
											setNewName={setNewName}
											setGetCheck={setGetCheck}
											setCheckAlert={setCheckAlert}
											already={true}
										/>
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
					{checkAlert ? (
						<span
							style={{
								position: 'absolute',
								right: '70px',
								bottom: '5px',
								color: 'red',
							}}
						>
							중복체크를 해주세요
						</span>
					) : null}
					<button
						onClick={() => {
							if (getCheck) {
								setCheckAlert(false);
								saveImage();
							} else {
								userInfo.name !== currentName ? null : saveImage();
							}
						}}
						className={styles.saveBtn}
					>
						저장
					</button>
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

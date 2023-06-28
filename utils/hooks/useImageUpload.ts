import {useRouter} from 'next/router';
import {
	BaseSyntheticEvent,
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import useRefreshToken from './useRefreshToken';

export default function useImageUpload(
	serverImageList: MyFile[],
	setServerImageList: Dispatch<SetStateAction<MyFile[]>>,
): [
	MutableRefObject<MyFile[]>,
	(fileName?: string, imageId?: number) => void,
	(e: BaseSyntheticEvent) => Promise<void>,
] {
	const [, setLocalImageState] = useState<boolean[]>([]);
	const localImageList = useRef<MyFile[]>([]);
	const type = useRef<string>('profile');
	const isLoaded = useRef<boolean>(false);
	const router = useRouter();
	const refresh = useRefreshToken();

	useEffect(() => {
		if (serverImageList.length !== 0 && !isLoaded.current) {
			localImageList.current = JSON.parse(JSON.stringify(serverImageList));
			setLocalImageState(
				localImageList.current.map((myFile: MyFile) => {
					return myFile.isUploaded;
				}),
			);
			isLoaded.current = true;
		}

		if (router.asPath.includes('adopt')) type.current = 'adopt';
		else if (router.asPath.includes('board')) type.current = 'community';
	}, []);

	async function changeImageInput(e: BaseSyntheticEvent) {
		let prevLength = localImageList.current.length;

		const fileList: MyFile[] = [...e.currentTarget.files]
			.filter((file: File) => {
				const regExp = /(.*?)\.(jpg|jpeg|png|bmp|gif)$/;
				return file.name.match(regExp) != null;
			})
			.map((file: File) => {
				return {
					localFile: file,
					isUploaded: false,
					localSrc: URL.createObjectURL(file),
				};
			});
		let newImageList: MyFile[] = [...localImageList.current, ...fileList];
		e.currentTarget.value = '';

		if (newImageList.length > 8) {
			alert('최대 8개까지만 선택이 가능합니다.');
		}
		newImageList = newImageList.filter(
			(myFile: MyFile, index: number) => index < 8,
		);

		localImageList.current = newImageList;

		updateState();
		for (let i = prevLength; i < newImageList.length; i++) {
			await uploadImage(newImageList[i]);
		}
	}

	function deleteImage(fileName?: string, imageId?: number) {
		if (!fileName && !imageId) return;

		if (fileName) {
			localImageList.current = localImageList.current.filter(
				(myFile: MyFile) => {
					if (myFile.localFile?.name == fileName) {
						window.URL.revokeObjectURL(myFile.localSrc as string);
					}
					return myFile.localFile?.name != fileName;
				},
			);

			setLocalImageState(
				localImageList.current.map((myFile: MyFile) => {
					return myFile.isUploaded;
				}),
			);
			setServerImageList(localImageList.current);
		} else if (imageId) {
			localImageList.current = localImageList.current.filter(
				(myFile: MyFile) => {
					return myFile.imageId != imageId;
				},
			);

			setLocalImageState(
				localImageList.current.map((myFile: MyFile) => {
					return myFile.isUploaded;
				}),
			);
			setServerImageList(localImageList.current);
		}
	}

	async function uploadImage(myFile: MyFile) {
		try {
			let formData = new FormData();
			if (!myFile.localFile) {
				throw new Error('Missing files');
			}
			formData.append('file', myFile.localFile);
			formData.append('type', type.current);
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/image`,
				{
					method: 'POST',
					headers: {
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
					body: formData,
				},
			);

			let result = await response.json();
			if (result.status === 200) {
				myFile.isUploaded = true;
				myFile.imageId = result.data.id;
				myFile.serverSrc = result.data.url;
			} else if (result.status === 401) {
				refresh();
				throw new Error('다시 시도해 주세요.');
			} else {
				throw new Error('이미지 업로드 실패');
			}
		} catch (e) {
			alert(e);
			deleteImage(myFile.localFile?.name);
		} finally {
			updateState();
		}
	}

	function updateState() {
		setLocalImageState(
			localImageList.current.map((myFile: MyFile) => {
				return myFile.isUploaded;
			}),
		);
		setServerImageList(localImageList.current);
	}

	return [localImageList, deleteImage, changeImageInput];
}

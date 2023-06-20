interface MyFile {
	localFile?: File;
	isUploaded: boolean;
	localSrc?: string;
	serverSrc?: string;
	imageId?: number;
}

interface ImageUploadResponse1 {
	imageNo: number;
	imageUrl: string;
}
interface ImageUploadResponse2 {
	imgNo: number;
	imgUrl: string;
}

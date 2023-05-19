interface MyFile {
	localFile?: File;
	isUploaded: boolean;
	localSrc?: string;
	serverSrc?: string;
	imageId?: number;
}

interface ImageUploadResponse {
	imageNo: number;
	imageUrl: string;
}

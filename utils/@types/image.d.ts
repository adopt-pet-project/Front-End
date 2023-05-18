interface MyFile {
	localFile?: File;
	isUploaded: boolean;
	src: string;
	imageId?: number;
}

interface ImageUploadResponse {
	imageNo: number;
	imageUrl: string;
}

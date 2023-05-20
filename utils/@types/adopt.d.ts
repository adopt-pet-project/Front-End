interface Adopt {
	id?: number;
	title: string;
	kind: string;
	location: string;
	bookmark: number;
	chat: number;
	publishedAt: string;
	thumbnail: string;
	species: string;
	status: number;
}

interface AdoptCoords {
	latitude: number;
	longitude: number;
	address: string;
}

interface AdoptHeader {
	title: string;
	status: number;
	publishedAt: number;
}

interface AdoptMetadata {
	gender: string;
	age: string;
	name: string;
	species: string;
}

interface AdoptContext {
	context: string;
	bookmark: number;
	chat: number;
}

interface AdoptAuthor {
	id: number;
	username: string;
	profile: string;
	address: string;
}

interface AdoptDetail {
	id: number;
	imageList: ImageUploadResponse[];
	coords: AdoptCoords;
	header: AdoptHeader;
	metadata: AdoptMetadata;
	context: AdoptContext;
	author: AdoptAuthor;
	mine: boolean;
}

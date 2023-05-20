import {Context} from '@/components/adopt/context';
import {Metadata} from '@/components/adopt/metadata';
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
	author: string;
	profile: string;
	location: string;
	mine: boolean;
}

interface AdoptDetail {
	id: number;
	authorId: string;
	images: ImageUploadResponse[];
	coords: AdoptCoords;
	header: AdoptHeader;
	metadata: AdoptMetadata;
	context: AdoptContext;
	author: AdoptAuthor;
}

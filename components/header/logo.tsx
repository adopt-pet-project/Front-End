import {useRouter} from 'next/router';
export default function Logo() {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				router.push('/');
			}}
			style={{display: 'flex', cursor: 'pointer'}}
		>
			<img src="/image/logo.png" alt="logo" height={52} />
		</div>
	);
}

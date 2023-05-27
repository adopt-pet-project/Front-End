import {Html, Head, Main, NextScript} from 'next/document';
import Script from 'next/script';

export default function Document() {
	return (
		<Html lang="kr">
			<Head />
			<body>
				<Main />
				<NextScript />
				<Script
					src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}}&libraries=services,clusterer&autoload=false`}
					strategy="beforeInteractive"
				/>
			</body>
		</Html>
	);
}

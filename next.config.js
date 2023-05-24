const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'mblogthumb-phinf.pstatic.net',
			'project-adopt-bucket.s3.ap-northeast-2.amazonaws.com',
		],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
};

module.exports = nextConfig;

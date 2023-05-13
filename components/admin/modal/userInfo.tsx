import styles from '@/styles/components/admin/modal/userInfo.module.scss';

function UserInfo() {
	return (
		<div
			onClick={e => {
				e.stopPropagation();
			}}
			className={styles.profileBox}
		>
			<img
				src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F029%2F2023%2F01%2F04%2F0002776727_001_20230104160001110.jpg&type=sc960_832"
				alt=""
			/>
			<div>
				<h1>날강도</h1>
				<p>경상남도 창원시</p>
				<div>
					<span>활동내역</span>
					<span>게시글 7</span>
					<span>댓글 22</span>
					<span>제재누적 2</span>
				</div>
			</div>
		</div>
	);
}

export default UserInfo;

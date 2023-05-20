import styles from '@/styles/components/adopt/animalInput.module.scss';

export default function AnimalInput() {
	return (
		<ul className={styles.container}>
			<span>동물정보 입력</span>
			<li>
				<label htmlFor="name">이름</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="이름을 입력하세요."
				/>
			</li>
			<li>
				<label htmlFor="gender">성별</label>
				<select name="gender" id="gender">
					<option value="모름">모름</option>
					<option value="남">남</option>
					<option value="여">여</option>
				</select>
			</li>
			<li>
				<label htmlFor="age">나이</label>
				<input
					type="text"
					name="age"
					id="age"
					placeholder="나이를 입력하세요."
				/>
			</li>
			<li>
				<label htmlFor="species">품종</label>
				<input
					type="text"
					name="species"
					id="species"
					placeholder="품종을 입력하세요."
				/>
			</li>
		</ul>
	);
}

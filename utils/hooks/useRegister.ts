function useRegister() {
	function setValue(reg?: RegisterInfo) {
		if (!reg) {
			window.localStorage.removeItem('register');
			return;
		}

		try {
			window.localStorage.setItem(
				'register',
				JSON.stringify({email: reg.email, provider: reg.provider}),
			);
		} catch (e) {
			alert(e);
		}
	}

	return setValue;
}

export default useRegister;

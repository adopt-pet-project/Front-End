import {useEffect, useRef} from 'react';

function useDepsOnlyEffect<T>(f: Function, deps: Array<T>) {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) f();
		else didMount.current = true;
	}, deps);
}

export default useDepsOnlyEffect;

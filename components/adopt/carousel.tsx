import {useCallback, useEffect, useRef, useState} from 'react';
import styles from '@/styles/components/adopt/carousel.module.scss';

export default function Carousel({
	imageList,
}: {
	imageList: ImageUploadResponse2[];
}) {
	const [page, setPage] = useState<number>(1);
	const preventScroll = useRef<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const mobileDragArea = useRef<HTMLDivElement>(null);
	const imagesRef = useRef<HTMLDivElement>(null);

	const beginX = useRef<number>(0);
	const dragAmount = useRef<number>(0);

	const regExp = /[^a-z,(]+[^px]/g;

	const carouselImageList = [
		imageList[imageList.length - 1].imgUrl,
		...imageList.map((image: ImageUploadResponse2) => image.imgUrl),
		imageList[0].imgUrl,
	];
	const touchStart = useCallback(
		(e: TouchEvent) => {
			if (!imagesRef.current || preventScroll.current) return;
			imagesRef.current.style.transition = '0s';
			beginX.current = e.touches[0].pageX;
		},
		[imagesRef.current, preventScroll.current],
	);

	const touchMove = useCallback(
		(e: TouchEvent) => {
			if (!imagesRef.current || preventScroll.current) return;
			imagesRef.current.style.transform = `translateX(${
				-1 * page
			}00%) translate(${
				dragAmount.current + (e.touches[0].pageX - beginX.current)
			}px)`;
		},
		[imagesRef.current, preventScroll.current, page],
	);

	const touchEnd = useCallback(
		(e: TouchEvent) => {
			if (!imagesRef.current || preventScroll.current) return;

			const width = (e.target as HTMLDivElement).clientWidth;
			let translate = 0;
			if (imagesRef.current.style.transform.split(' ')[1])
				translate = Number(
					imagesRef.current.style.transform.split(' ')[1].match(regExp),
				);

			imagesRef.current.style.transition = 'var(--transition)';
			if (translate / width < -0.15) {
				onClickRight();
			} else if (translate / width > 0.15) {
				onClickLeft();
			} else {
				imagesRef.current.style.transform =
					imagesRef.current.style.transform.split(' ')[0];
			}
			dragAmount.current = 0;
		},
		[imagesRef.current, preventScroll.current, page],
	);

	useEffect(() => {
		mobileDragArea.current?.addEventListener('touchstart', touchStart, {
			passive: false,
		});
		mobileDragArea.current?.addEventListener('touchmove', touchMove, {
			passive: false,
		});
		mobileDragArea.current?.addEventListener('touchend', touchEnd, {
			passive: false,
		});

		return () => {
			mobileDragArea.current?.removeEventListener('touchstart', touchStart);
			mobileDragArea.current?.removeEventListener('touchmove', touchMove);
			mobileDragArea.current?.removeEventListener('touchend', touchEnd);
		};
	}, [imagesRef.current, page]);

	useEffect(() => {
		if (imagesRef.current)
			imagesRef.current.ontransitionend = () => {
				if (page === 1 || page === carouselImageList.length - 2) {
					setPage(page === 1 ? carouselImageList.length - 2 : 1);
					imagesRef.current!.style.transition = 'none';
					setTimeout(() => {
						imagesRef.current!.style.transition = 'var(--transition)';
						preventScroll.current = false;
					}, 30);
				} else {
					preventScroll.current = false;
				}
			};
	}, []);

	function onClickLeft() {
		if (!preventScroll.current && imagesRef.current) {
			setPage(page - 1);
			preventScroll.current = true;
		}
	}

	function onClickRight() {
		if (!preventScroll.current && imagesRef.current) {
			setPage(page + 1);
			preventScroll.current = true;
		}
	}
	return (
		<div className={styles.container} ref={containerRef}>
			<div
				className={styles.images}
				ref={imagesRef}
				style={{transform: `translateX(${-1 * page}00%)`}}
			>
				{carouselImageList.map((imageSrc: string, index: number) => {
					return (
						<img
							key={imageSrc + index}
							className={styles.image}
							src={imageSrc}
						/>
					);
				})}
			</div>

			<div className={styles.control}>
				<div className={styles.desktop}>
					<div className={styles.left} onClick={onClickLeft}>
						<img src="/icon/left.svg" alt="left button" />
					</div>
					<div className={styles.right} onClick={onClickRight}>
						<img src="/icon/left.svg" alt="left button" />
					</div>
				</div>
				<div className={styles.mobile} ref={mobileDragArea} />
			</div>
		</div>
	);
}

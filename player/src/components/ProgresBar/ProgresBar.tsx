import { useEffect, useRef, useState } from "react";
import "./ProgresBar.css";

export function ProgresBar(props: any) {
	// const getLength = (duration: number) => {
	// 	const min = Math.floor(duration / 60);
	// 	const sec = Math.floor(duration - min * 60);
	// 	const length = min + ":" + sec;
	// 	setLength(length);
	// };

	// const updateCurrentTime = () => {
	// 	const minutes = Math.floor(audioElement.current!.currentTime / 60);
	// 	const seconds = audioElement.current!.currentTime % 60;
	// 	const formattedTime = `${minutes}:${seconds
	// 		.toFixed(0)
	// 		.toString()
	// 		.padStart(2, "0")}`;
	// 	setCurrentTime(formattedTime);
	// 	setNow(audioElement.current!.currentTime);
	// };

	return (
		<div className="progresBar">
			<input type="range" className="volumeControl" />
			<div className="length">
				<span className="currentTime"></span>
				<span className="length"></span>
			</div>
		</div>
	);
}

import { useEffect, useRef, useState } from "react";
import typebeat from "../../songs/typeBeat.mp3";
import "./ProgresBar.css";
export function ProgresBar(props: any) {
	const audioElement = useRef<null | HTMLAudioElement>(null);
	const [length, setLength] = useState<string>();
	const [currentTime, setCurrentTime] = useState("0:00");
	const [now, setNow] = useState(0);

	useEffect(() => {
		if (props.isPlaying) {
			audioElement.current!.play();
		} else {
			audioElement.current!.pause();
		}
		const duration = audioElement.current!.duration;
		getLength(duration);
	}, [props.isPlaying]);

	const getLength = (duration: number) => {
		const min = Math.floor(duration / 60);
		const sec = Math.floor(duration - min * 60);
		const length = min + ":" + sec;
		setLength(length);
	};

	const updateCurrentTime = () => {
		const minutes = Math.floor(audioElement.current!.currentTime / 60);
		const seconds = audioElement.current!.currentTime % 60;
		const formattedTime = `${minutes}:${seconds
			.toFixed(0)
			.toString()
			.padStart(2, "0")}`;
		setCurrentTime(formattedTime);
		setNow(audioElement.current!.currentTime);
	};

	const moveTrack = () => {};

	return (
		<div className="progresBar">
			<input
				type="range"
				className="volumeControl"
				max={length}
				value={now}
				onChange={(e) => {
					console.log(e.target.value);
				}}
			/>
			<div className="length">
				<span className="currentTime">{currentTime}</span>
				<span className="length">{length}</span>
			</div>
			<audio
				src={typebeat}
				ref={audioElement}
				onTimeUpdate={updateCurrentTime}
			></audio>
		</div>
	);
}

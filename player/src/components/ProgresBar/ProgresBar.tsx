import { useEffect, useRef, useState } from "react";
import typebeat from "../../songs/typeBeat.mp3";
import "./ProgresBar.css";
export function ProgresBar(props: any) {
	const audioElement = useRef<null | HTMLAudioElement>(null);
	const [duration, setDuration] = useState<number>(0);
	const [length, setLength] = useState<string>();
	useEffect(() => {
		if (props.isPlaying) {
			audioElement.current!.play();
		} else {
			audioElement.current!.pause();
		}
		const duration = audioElement.current!.duration;
		setDuration(duration);
		getLength(duration);
	}, [props.isPlaying]);

	useEffect(() => {
		console.log(audioElement.current?.duration);
	}, [props.isPlaying]);

	const getLength = (duration: number) => {
		const min = Math.floor(duration / 60);
		const sec = Math.floor(duration - min * 60);
		const length = min + ":" + sec;
		setLength(length);
	};

	return (
		<div className="progresBar">
			<input type="range" className="volumeControl" />
			<span className="length">{length}</span>
			<audio src={typebeat} ref={audioElement}></audio>
		</div>
	);
}

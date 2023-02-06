import { Controls } from "./controls/Controls";
import { AlbumPic } from "./AlbumPic/AlbumPic";
import { useState, useRef, useEffect } from "react";
import "./Player.css";
import { ProgresBar } from "./ProgresBar/ProgresBar";
import typebeat from "../songs/typeBeat.mp3";

export function Player(props: any) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [audioSource, setAudioSource] = useState<HTMLAudioElement>();
	const audioElement = useRef<HTMLAudioElement | null>();

	useEffect(() => {}, []);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
		if (!isPlaying) {
			const audioCtx = new AudioContext();
			const out = audioCtx.destination;
			const mediaSource = audioCtx.createMediaElementSource(
				audioElement.current
			);
			const analyser = audioCtx.createAnalyser();
			mediaSource.connect(analyser);
			analyser.connect(out);
			// analyser.fftSize = 16384;
			// const bufferLength = analyser.frequencyBinCount;
			// console.log(bufferLength);
			// const dataArray = new Uint8Array(bufferLength);
			// const arr = analyser.getByteFrequencyData(dataArray);
			// console.log(arr);
			audioElement.current.play();
		} else if (isPlaying) {
			audioElement.current.pause();
		}
	};

	// useEffect(() => {
	// 	if (isPlaying) {
	// 		const audioCtx = new AudioContext();
	// 		const out = audioCtx.destination;
	// 		const mediaSource = audioCtx.createMediaElementSource(audioElement.current);
	// 		const analyser = audioCtx.createAnalyser();
	// 		mediaSource.connect(analyser);
	// 		analyser.connect(out);
	// 		audio.play();
	// 	} else if (!isPlaying) {
	// 		audio.pause();
	// 	}
	// }, [isPlaying]);

	return (
		<div className="player">
			<AlbumPic />
			<ProgresBar isPlaying={isPlaying} />
			<audio ref={audioElement} src={typebeat} />
			<Controls togglePlayPause={togglePlayPause} isPlaying={isPlaying} />
		</div>
	);
}

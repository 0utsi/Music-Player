import { Controls } from "./controls/Controls";
import { AlbumPic } from "./AlbumPic/AlbumPic";
import { useState, useRef, useEffect } from "react";
import "./Player.css";
import { ProgresBar } from "./ProgresBar/ProgresBar";
import typebeat from "../songs/typeBeat.mp3";
import lofi from "../songs/88 Keys.mp3";
import beat from "../songs/beat.mp3";

export function Player(props: any) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [analyser, setAnalyser] = useState<AnalyserNode>();
	const audioElement = useRef<HTMLAudioElement | null>();
	const [ctxEx, setCtxEx] = useState(false);
	const [loud, setLoud] = useState<number>();
	const [bufferLength, setBufferLength] = useState<number>();
	const dataArray = useRef<Uint8Array>();

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
		if (!isPlaying && !ctxEx) {
			const audioCtx = new AudioContext({ latencyHint: 100 });
			console.log(audioCtx.baseLatency);
			const analyser = new AnalyserNode(audioCtx, { fftSize: 32768 });
			const mediaSource = audioCtx.createMediaElementSource(
				audioElement.current
			);
			// const delay = audioCtx.createDelay(10);
			// delay.delayTime.value = 5;
			setAnalyser(analyser);
			const filter = audioCtx.createBiquadFilter();
			filter.type = "bandpass";
			// filter.frequency.setTargetAtTime(500, audioCtx.currentTime, 1);
			// delay.delayTime.setValueAtTime(50, audioCtx.currentTime);

			const bufferLength = analyser.frequencyBinCount;
			setBufferLength(bufferLength);
			const array = new Uint8Array(bufferLength);
			dataArray.current = array;

			// mediaSource.connect(delay);
			filter.connect(audioCtx.destination);
			mediaSource.connect(analyser);
			mediaSource.connect(filter);
			analyser.connect(audioCtx.destination);
			audioElement.current.play();
			setCtxEx(true);
		} else if (isPlaying) {
			audioElement.current.pause();
		} else if (!isPlaying && ctxEx) {
			audioElement.current.play();
		}
	};

	const setArray = () => {
		analyser.getByteFrequencyData(dataArray.current);
		analyser.getByteTimeDomainData(dataArray.current);
		const ile = dataArray.current.filter((x) => x > 190).length;
		setLoud(ile / 50);
	};

	return (
		<div
			className="player"
			style={{
				boxShadow: "0px 0px 60px " + loud + "px #42445a",
			}}
		>
			<AlbumPic />
			<ProgresBar isPlaying={isPlaying} />
			<audio ref={audioElement} src={typebeat} onTimeUpdate={setArray} />
			<Controls togglePlayPause={togglePlayPause} isPlaying={isPlaying} />
		</div>
	);
}

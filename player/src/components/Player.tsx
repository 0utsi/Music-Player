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
	const [loud, setLoud] = useState<number>(0);
	const freqData = useRef<Uint8Array>();

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
		if (!isPlaying && !ctxEx) {
			const audioCtx = new AudioContext({ latencyHint: 20 });
			console.log(audioCtx.baseLatency);
			const analyser = new AnalyserNode(audioCtx, { fftSize: 32768 });
			const mediaSource = audioCtx.createMediaElementSource(
				audioElement.current
			);

			setAnalyser(analyser);
			const filter = audioCtx.createBiquadFilter();
			filter.type = "bandpass";
			filter.frequency.setTargetAtTime(200, audioCtx.currentTime, 0);
			filter.gain.setValueAtTime(100, audioCtx.currentTime);

			const bufferLength = analyser.frequencyBinCount;

			const array = new Uint8Array(bufferLength);
			freqData.current = array;

			analyser.connect(audioCtx.destination);
			filter.connect(audioCtx.destination);
			mediaSource.connect(analyser).connect(filter);

			audioElement.current.play();
			setCtxEx(true);
		} else if (isPlaying) {
			audioElement.current.pause();
		} else if (!isPlaying && ctxEx) {
			audioElement.current.play();
		}
	};

	const setArray = () => {
		analyser.getByteFrequencyData(freqData.current);
		analyser.getByteTimeDomainData(freqData.current);
		const bass = freqData.current.filter((x) => x > 200).length;
		setLoud(bass / 49);
	};

	return (
		<div
			className="player"
			style={{
				boxShadow: "0px 0px 70px " + loud + "px #42445a",
			}}
		>
			<div
				className="insideShadow"
				style={{
					boxShadow: "inset 0 0 60px " + loud / 4.5 + "px #42445a",
				}}
			></div>
			<AlbumPic />
			{/* <ProgresBar isPlaying={isPlaying} /> */}
			<audio ref={audioElement} src={typebeat} onTimeUpdate={setArray} />
			<Controls togglePlayPause={togglePlayPause} isPlaying={isPlaying} />
		</div>
	);
}

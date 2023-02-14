import { Controls } from "./controls/Controls";
import { AlbumPic } from "./AlbumPic/AlbumPic";
import { useState, useRef, useEffect, useContext } from "react";
import "./Player.css";
import { ProgresBar } from "./ProgresBar/ProgresBar";
import alt from "../songs/alt.mp3";
import typebeat from "../songs/typebeat.mp3";
import { Equalizer } from "./Equalizer/Equalizer";
import audioProvider from "../providers/AudioProvider";

export function Player(props: any) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [analyser, setAnalyser] = useState<AnalyserNode>();
	const audioElement = useRef<HTMLAudioElement | null>();
	const [audioCtx, setAudioCtx] = useState<AudioContext>();
	const [loud, setLoud] = useState<number>(0);
	const freqData = useRef<Uint8Array>();
	const [volume, setVolume] = useState<number>();
	const [gain, setGain] = useState<GainNode>();

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
		if (!isPlaying && !audioCtx) {
			const audioCtx = new AudioContext({ latencyHint: 50 });
			setAudioCtx(audioCtx);
			const analyser = new AnalyserNode(audioCtx, { fftSize: 32768 });
			setAnalyser(analyser);
			const gainNode = new GainNode(audioCtx, { gain: volume });
			setGain(gainNode);
			const mediaSource = audioCtx.createMediaElementSource(
				audioElement.current
			);

			const audioProvider = useContext(AudioContext);

			// gainNode.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.01);

			const filter = audioCtx.createBiquadFilter();
			filter.type = "lowpass";
			filter.frequency.setTargetAtTime(1000, audioCtx.currentTime, 0);
			filter.gain.setValueAtTime(1000, audioCtx.currentTime);

			const bufferLength = analyser.frequencyBinCount;
			const array = new Uint8Array(bufferLength);
			freqData.current = array;

			1; // gainNode.connect(audioCtx.destination);
			analyser.connect(audioCtx.destination);
			filter.connect(audioCtx.destination);
			mediaSource.connect(analyser).connect(filter).connect(gainNode);

			audioElement.current.play();
		} else if (isPlaying) {
			audioElement.current.pause();
		} else if (!isPlaying && audioCtx) {
			audioElement.current.play();
		}
	};

	const setArray = () => {
		analyser.getByteFrequencyData(freqData.current);
		analyser.getByteTimeDomainData(freqData.current);
		const bass = freqData.current.filter((x) => x > 200).length;
		setLoud(bass / 90);
	};

	return (
		<div
			className="player"
			style={{
				boxShadow: "0px 0px 40px " + loud + "px #42445a",
			}}
		>
			<div
				className="insideShadow"
				style={{
					boxShadow: "inset 0 0 40px " + loud / 1.5 + "px #42445a",
				}}
			></div>
			<AlbumPic />
			{/* <ProgresBar isPlaying={isPlaying} /> */}
			<audio ref={audioElement} src={typebeat} onTimeUpdate={setArray} />
			<Controls togglePlayPause={togglePlayPause} isPlaying={isPlaying} />
			{/* <Equalizer volume={volume} setVolume={setVolume}></Equalizer> */}
		</div>
	);
}

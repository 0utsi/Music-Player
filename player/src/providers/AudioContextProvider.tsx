import { createContext, useState, useEffect } from "react";
import typebeat from "../songs/typeBeat.mp3";
import FUCK from '../songs/FUCK.mp3'
import jadu from '../songs/jadu.mp3'
const AudioContextCtx = createContext({
	playAudio: () => {},
	changeVolume: (volume) => {},
	isPlaying: false,
	frequencyData: null,
	volume: null,
});

function AudioContextProvider({ children }) {
	const [audioCtx, setAudioCtx] = useState<AudioContext>(null);
	const [analyser, setAnalyser] = useState<AnalyserNode>();
	const [audio, setAudio] = useState<HTMLAudioElement>();
	const [gain, setGain] = useState<GainNode>();
	const [isPlaying, setIsPlaying] = useState<boolean>();
	const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);
	const [volume, setVolume] = useState<number>(0.5);

	const playAudio = () => {
		setIsPlaying(!isPlaying);
		if (!audioCtx && !isPlaying) {
			const audioCtx = new AudioContext({ latencyHint: 50 });
			setAudioCtx(audioCtx);
			// Visualisation
			const analyser = new AnalyserNode(audioCtx, { fftSize: 16384 });
			setAnalyser(analyser);
			//Audio
			const audio = new Audio(typebeat);
			setAudio(audio);
			//Volume
			const gainNode = new GainNode(audioCtx, { gain: volume });
			setGain(gainNode);

			const source = audioCtx.createMediaElementSource(audio);
			analyser.connect(audioCtx.destination);
			source.connect(analyser).connect(gain).connect(audioCtx.destination);

			audio.play();
			setIsPlaying(true);
		} else if (isPlaying) {
			audio.pause();
		} else if (!isPlaying && audioCtx) {
			audio.play();
		}
	};

	const changeVolume = (volume: number) => {
		gain.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.01);
		console.log(volume);
		// setVolume(volume);
	};

	// Get decibels
	useEffect(() => {
		let intervalId: number;
		const updateFrequencyData = () => {
			const data = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(data);
			setFrequencyData(data);
			console.log(data)
		};
		if (isPlaying) {
			intervalId = setInterval(updateFrequencyData, 100);
		}
		return () => {
			clearInterval(intervalId);
		};
	}, [analyser, isPlaying]);

	return (
		<AudioContextCtx.Provider
			value={{
				playAudio,
				changeVolume,
				isPlaying,
				frequencyData,
				volume,
			}}
		>
			{children}
		</AudioContextCtx.Provider>
	);
}

export { AudioContextProvider, AudioContextCtx };

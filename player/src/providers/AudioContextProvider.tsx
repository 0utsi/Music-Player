import { createContext, useState, useEffect } from "react";
import typebeat from "../songs/typeBeat.mp3";

const AudioContextCtx = createContext({
	playAudio: () => {},
	changeVolume: (volume) => {},
	isPlaying: false,
	frequencyData: null,
});

function AudioContextProvider({ children }) {
	const [audioCtx, setAudioCtx] = useState<AudioContext>(null);
	const [analyser, setAnalyser] = useState<AnalyserNode>();
	const [audio, setAudio] = useState<HTMLAudioElement>();
	const [gain, setGain] = useState<GainNode>();
	const [isPlaying, setIsPlaying] = useState<boolean>();
	const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);

	const playAudio = () => {
		setIsPlaying(!isPlaying);
		if (!audioCtx && !isPlaying) {
			const audioCtx = new AudioContext({ latencyHint: 30 });
			setAudioCtx(audioCtx);
			const analyser = new AnalyserNode(audioCtx, { fftSize: 32768 });
			setAnalyser(analyser);
			const audio = new Audio(typebeat);
			setAudio(audio);
			const gainNode = new GainNode(audioCtx, { gain: 0.5 });
			setGain(gainNode);

			const source = audioCtx.createMediaElementSource(audio);
			analyser.connect(audioCtx.destination);
			source.connect(gainNode).connect(analyser).connect(audioCtx.destination);

			audio.play();
			setIsPlaying(true);
		} else if (isPlaying) {
			audio.pause();
		} else if (!isPlaying && audioCtx) {
			audio.play();
		}
	};

	const changeVolume = (volume: number) => {
		gain.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.1);
	};

	// Get array of high decibels
	useEffect(() => {
		let intervalId: number;
		const updateFrequencyData = () => {
			const data = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(data);
			analyser.getByteTimeDomainData(data);
			console.log(data);
			setFrequencyData(data);
		};
		if (isPlaying) {
			intervalId = setInterval(updateFrequencyData, 50);
		}
		return () => {
			clearInterval(intervalId);
		};
	}, [analyser, isPlaying]);

	return (
		<AudioContextCtx.Provider
			value={{ playAudio, changeVolume, isPlaying, frequencyData }}
		>
			{children}
		</AudioContextCtx.Provider>
	);
}

export { AudioContextProvider, AudioContextCtx };

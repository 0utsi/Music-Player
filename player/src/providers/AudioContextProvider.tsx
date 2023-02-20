import React, { createContext, useContext, useState, useEffect } from "react";
import typebeat from "../songs/typeBeat.mp3";

const AudioContextCtx = createContext({
	playAudio: () => {},
	isPlaying: false,
	audio: null,
	frequencyData: null,
});

function AudioContextProvider({ children }) {
	const [audioCtx, setAudioCtx] = useState<AudioContext>(null);
	const [analyser, setAnalyser] = useState<AnalyserNode>();
	const [audio, setAudio] = useState<HTMLAudioElement>();
	const [isPlaying, setIsPlaying] = useState<boolean>();
	const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);

	const playAudio = () => {
		setIsPlaying(!isPlaying);
		if (!audioCtx && !isPlaying) {
			const audioCtx = new AudioContext({ latencyHint: 50 });
			setAudioCtx(audioCtx);
			const analyser = new AnalyserNode(audioCtx, { fftSize: 32768 });
			setAnalyser(analyser);
			const audio = new Audio(typebeat);
			setAudio(audio);

			const source = audioCtx.createMediaElementSource(audio);
			source.connect(audioCtx.destination);
			source.connect(analyser);
			analyser.connect(audioCtx.destination);
			audio.play();
			setIsPlaying(true);
		} else if (isPlaying) {
			audio.pause();
		} else if (!isPlaying && audioCtx) {
			audio.play();
		}
	};

	useEffect(() => {
		let intervalId: number;

		const updateFrequencyData = () => {
			const data = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(data);
			analyser.getByteTimeDomainData(data);
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
			value={{ playAudio, isPlaying, audio, frequencyData }}
		>
			{children}
		</AudioContextCtx.Provider>
	);
}

export { AudioContextProvider, AudioContextCtx };

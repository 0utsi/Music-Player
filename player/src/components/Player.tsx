import { Controls } from "./controls/Controls";
import { AlbumPic } from "./AlbumPic/AlbumPic";
import { useState, useRef, useEffect } from "react";
import "./Player.css";
import { ProgresBar } from "./ProgresBar/ProgresBar";
import typebeat from "../songs/typeBeat.mp3";

export function Player(props: any) {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioElement = useRef<HTMLAudioElement | null>();
	const audioRef = useRef({
		context: new AudioContext(),
	});

	// useEffect(() => {
	// 	const mediaElement = audioRef.current.context.createMediaElementSource(
	// 		audioElement.current
	// 	);
	// 	mediaElement.connect(audioRef.current.context.destination);
	// }, []);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	useEffect(() => {
		if (isPlaying) {
			audioElement.current.play();
		} else if (!isPlaying) {
			audioElement.current.pause();
		}
	}, [isPlaying]);

	return (
		<div className="player">
			<AlbumPic />
			<ProgresBar isPlaying={isPlaying} />
			<audio ref={audioElement} src={typebeat} />
			<Controls togglePlayPause={togglePlayPause} isPlaying={isPlaying} />
		</div>
	);
}

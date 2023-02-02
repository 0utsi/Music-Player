import { Controls } from "./components/controls/Controls";
import { AlbumPic } from "./components/AlbumPic/AlbumPic";
import { useState, useRef, useEffect } from "react";
import song from "./songs/88 Keys.mp3";

export function Player(props: any) {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioElement = useRef<null | HTMLAudioElement>(null);

	const togglePlayPause = () => {
		setIsPlaying(isPlaying);
		setIsPlaying(!isPlaying);
	};

	useEffect(() => {
		console.log(props.songs[0].src);
		if (isPlaying) {
			audioElement.current!.play();
		} else {
			audioElement.current!.pause();
		}
	}, [isPlaying]);

	return (
		<div className="player">
			<AlbumPic />
			<audio src={song} ref={audioElement}></audio>
			<Controls togglePlayPause={togglePlayPause} isPlaying={isPlaying} />
		</div>
	);
}

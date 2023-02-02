import { Controls } from "./controls/Controls";
import { AlbumPic } from "./AlbumPic/AlbumPic";
import { useState, useRef, useEffect } from "react";
import "./Player.css";
import { ProgresBar } from "./ProgresBar/ProgresBar";

export function Player(props: any) {
	const [isPlaying, setIsPlaying] = useState(false);

	const togglePlayPause = () => {
		setIsPlaying(isPlaying);
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="player">
			<AlbumPic />
			<ProgresBar isPlaying={isPlaying} />
			<Controls togglePlayPause={togglePlayPause} isPlaying={isPlaying} />
		</div>
	);
}

import { Controls } from "./controls/Controls";
import { AlbumPic } from "./AlbumPic/AlbumPic";
import { useState, useRef, useEffect, useContext } from "react";
import { AudioContextCtx } from "../providers/AudioContextProvider";
import "./Player.css";

export function Player(props: any) {
	const [loud, setLoud] = useState<number>(0);

	const { frequencyData } = useContext(AudioContextCtx);

	useEffect(() => {
		if (frequencyData) {
			const bass = frequencyData.filter((x: number) => x > 200).length;
			console.log(bass);
			setLoud(bass / 60);
		}
	}, [frequencyData]);

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
			{/* <audio ref={audioElement} src={typebeat} onTimeUpdate={setArray} /> */}
			<Controls />
			{/* <Equalizer volume={volume} setVolume={setVolume}></Equalizer> */}
		</div>
	);
}

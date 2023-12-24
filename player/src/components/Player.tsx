import { Controls } from "./controls/Controls";
import { AlbumPic } from "./AlbumPic/AlbumPic";
import { ProgresBar } from "./ProgresBar/ProgresBar";
import { Equalizer } from "./Equalizer/Equalizer";
import { useState, useRef, useEffect, useContext } from "react";
import { AudioContextCtx } from "../providers/AudioContextProvider";
import "./Player.css";
import AudioVisualizer from "./Visualizer/Visualizer";
export function Player() {
	const [loud, setLoud] = useState<number>(0);
	const [equalizer, setEqualizer] = useState(false);
	const { frequencyData, volume } = useContext(AudioContextCtx);

	const showEq = () => {
		setEqualizer(!equalizer);
		console.log(volume);
	};

	//Visualisation
	useEffect(() => {
		if (frequencyData) {
			const bass = frequencyData.filter((x: number) => x > 190 && x < 240).length;
			setLoud(bass / 1.5);
			console.log(bass)
		}
	}, [frequencyData]);

	return (
		<>
		<div
			className="player"
			style={{
				boxShadow: "0px 0px 40px " + loud + "px #42445a",
			}}
		>
			<div
				className="insideShadow"
				style={{
					boxShadow: "inset 0 0 40px " + loud / 2 + "px #42445a",
				}}
			></div>
			<AlbumPic />
			{/* <ProgresBar /> */}
			<Controls showEq={showEq} />
			{equalizer && <Equalizer />}
		</div>
		<AudioVisualizer />
		</>
	);
}

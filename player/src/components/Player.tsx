import { Controls } from "./controls/Controls";
import { AlbumPic } from "./AlbumPic/AlbumPic";
import { ProgresBar } from "./ProgresBar/ProgresBar";
import { Equalizer } from "./Equalizer/Equalizer";
import { useState, useRef, useEffect, useContext } from "react";
import { AudioContextCtx } from "../providers/AudioContextProvider";
import "./Player.css";

export function Player() {
	const [loud, setLoud] = useState<number>(0);
	const [equalizer, setEqualizer] = useState(false);
	const { frequencyData } = useContext(AudioContextCtx);

	const showEq = () => {
		setEqualizer(!equalizer);
	};

	//Visualisation
	useEffect(() => {
		if (frequencyData) {
			const bass = frequencyData.filter((x: number) => x > 210).length;
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
			{/* <ProgresBar /> */}
			<Controls showEq={showEq} />
			{equalizer && <Equalizer />}
		</div>
	);
}

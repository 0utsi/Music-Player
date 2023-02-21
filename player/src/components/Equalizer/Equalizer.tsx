import "./Equalizer.css";
import { useContext, useState } from "react";
import { AudioContextCtx } from "../../providers/AudioContextProvider";
export function Equalizer() {
	const { changeVolume } = useContext(AudioContextCtx);

	const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const volume = parseFloat(e.target.value);
		console.log(volume);
		changeVolume(volume);
	};

	return (
		<div className="eq">
			<label className="eqLabels">Volume</label>
			<input
				type="range"
				min="0"
				max="1"
				step=".01"
				className="eqSliders"
				defaultValue="50"
				onChange={handleChangeVolume}
			/>
			{}
			<label className="eqLabels">Bass</label>
			<input type="range" min="-10" max="10" value="0" className="eqSliders" />
			<label className="eqLabels">Treble</label>
			<input type="range" min="-10" max="10" value="0" className="eqSliders" />
		</div>
	);
}

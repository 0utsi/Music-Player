import "./Equalizer.css";
import { useContext, useState } from "react";
import { AudioContextCtx } from "../../providers/AudioContextProvider";
export function Equalizer(props) {
	const { changeVolume } = useContext(AudioContextCtx);

	// const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const volume = parseFloat(e.target.value);
	// 	changeVolume(volume);
	// };

	return (
		<div className="eq">
			<label className="eqLabels">Volume</label>
			<input
				type="range"
				min="0"
				max="1"
				step=".01"
				className="eqSliders"
				onChange={(event) => changeVolume(parseFloat(event.target.value))}
			/>
		</div>
	);
}

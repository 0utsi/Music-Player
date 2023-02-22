import "./Equalizer.css";
import { useContext, useState } from "react";
import { AudioContextCtx } from "../../providers/AudioContextProvider";
export function Equalizer() {
	const { changeVolume, setTrebleLevel } = useContext(AudioContextCtx);
	const [multiplier, setMultiplier] = useState();

	const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const volume = parseFloat(e.target.value);
		const volMultiplier = 100 / volume;
		console.log(volMultiplier);
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
				defaultValue="0.5"
				onChange={handleChangeVolume}
			/>
			<label className="eqLabels">Bass</label>
			<input type="range" min="-10" max="10" value="0" className="eqSliders" />
			<label className="eqLabels">Treble</label>
			<input
				type="range"
				min="-10"
				max="10"
				step="1"
				onChange={(event) => setTrebleLevel(parseInt(event.target.value))}
			/>
		</div>
	);
}

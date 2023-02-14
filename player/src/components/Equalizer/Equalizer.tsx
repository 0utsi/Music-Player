import "./Equalizer.css";
export function Equalizer(props) {
	return (
		<div className="eq">
			<label className="eqLabels">Volume</label>
			<input
				type="range"
				min="0"
				max="1"
				value={props.volume}
				step=".01"
				onChange={(e) => {
					return props.setVolume(parseFloat(e.target.value));
				}}
				className="eqSliders"
			/>
			<label className="eqLabels">Bass</label>
			<input type="range" min="-10" max="10" value="0" className="eqSliders" />
			<label className="eqLabels">Treble</label>
			<input type="range" min="-10" max="10" value="0" className="eqSliders" />
		</div>
	);
}

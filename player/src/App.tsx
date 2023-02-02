import "./App.css";
import { useState } from "react";
import { Player } from "./components/Player";

function App() {
	const [songs] = useState([
		{
			title: "88 Keys",
			artist: "Oatmello",
			album: "Snapshots",
			track: "3",
			year: "",
			src: "./songs/88 Keys.mp3",
		},
	]);

	return (
		<div className="App">
			<Player songs={songs} />
		</div>
	);
}

export default App;

import "./App.css";
import { useState } from "react";
import { Player } from "./Player";

function App() {
	const [songs] = useState([
		{
			title: "88 Keys",
			artist: "Oatmello",
			album: "Snapshots",
			track: "3",
			year: "",
			img_src: "./songs_images/88 Keys_Cover (front)_e.jpg",
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

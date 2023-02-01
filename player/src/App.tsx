import "./App.css";
import {
	faPlay,
	faBackward,
	faForward,
	faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function App() {
	const [play, setPlay] = useState(false);

	const stopPlay = () => {
		if (!play) setPlay(true);
		if (play) setPlay(false);
	};

	return (
		<div className="App">
			<div className="controls">
				<button className="previous">
					<FontAwesomeIcon className="nextPrevIcon" icon={faBackward} />
				</button>
				<button className="play-pause" onClick={stopPlay}>
					{!play && <FontAwesomeIcon className="playButton" icon={faPlay} />}
					{play && <FontAwesomeIcon className="playButton" icon={faPause} />}
				</button>
				<button className="next">
					<FontAwesomeIcon className="nextPrevIcon" icon={faForward} />
				</button>
			</div>
		</div>
	);
}

export default App;

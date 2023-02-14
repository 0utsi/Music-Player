import { Player } from "./components/Player";
import { AudioContext } from "./providers/AudioProvider";

function App() {
	return (
		<div className="App">
			<h1 className="header">Your Daily M</h1>
			<Player />
			<h3 className="footer">Demo</h3>
		</div>
	);
}

export default App;

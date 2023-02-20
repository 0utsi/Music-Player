import { Player } from "./components/Player";
import { AudioContextProvider } from "./providers/AudioContextProvider";

function App() {
	return (
		<AudioContextProvider>
			<div className="App">
				<Player />
			</div>
		</AudioContextProvider>
	);
}

export default App;

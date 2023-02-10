import {
	faPlay,
	faBackward,
	faForward,
	faPause,
	faArrowRotateRight,
	faHeart,
	faSliders,
	faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Controls.css";

export function Controls(props: any) {
	return (
		<div className="controls">
			<div className="main-controls">
				<button className="previous">
					<FontAwesomeIcon className="prevIcon" icon={faBackward} />
				</button>
				<button className="play-pause" onClick={props.togglePlayPause}>
					{!props.isPlaying ? (
						<FontAwesomeIcon className="playIcon" icon={faPlay} />
					) : (
						props.isPlaying && (
							<FontAwesomeIcon className="playIcon" icon={faPause} />
						)
					)}
				</button>
				<button className="next">
					<FontAwesomeIcon className="nextIcon" icon={faForward} />
				</button>
			</div>
			<div className="player-footer">
				<FontAwesomeIcon className="footerIcon heartIcon" icon={faHeart} />
				<FontAwesomeIcon
					className="shuffleIcon"
					style={{ opacity: "0.5" }}
					icon={faShuffle}
				/>
				<FontAwesomeIcon className="footerIcon" icon={faArrowRotateRight} />
				<FontAwesomeIcon className="footerIcon" icon={faSliders} />
			</div>
		</div>
	);
}

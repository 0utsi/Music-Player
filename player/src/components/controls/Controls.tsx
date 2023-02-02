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
					<FontAwesomeIcon className="nextPrevIcon" icon={faBackward} />
				</button>
				<button className="play-pause" onClick={props.togglePlayPause}>
					{!props.isPlaying ? (
						<FontAwesomeIcon className="playButton" icon={faPlay} />
					) : (
						props.isPlaying && (
							<FontAwesomeIcon className="playButton" icon={faPause} />
						)
					)}
				</button>
				<button className="next">
					<FontAwesomeIcon className="nextPrevIcon" icon={faForward} />
				</button>
			</div>
			<div className="player-footer">
				<FontAwesomeIcon className="footerIcon" icon={faHeart} />
				<FontAwesomeIcon className="footerIcon" icon={faShuffle} />
				<FontAwesomeIcon className="footerIcon" icon={faArrowRotateRight} />
				<FontAwesomeIcon className="footerIcon" icon={faSliders} />
			</div>
		</div>
	);
}

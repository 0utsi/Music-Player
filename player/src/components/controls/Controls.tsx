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
import { useContext, useEffect, useState } from "react";
import "./Controls.css";
import { AudioContextCtx } from "../../providers/AudioContextProvider";

export function Controls(props: any) {
	const [isLiked, setIsLiked] = useState(false);
	const likeButtonClasses = ["footerIcon", "heartIcon"];
	const { playAudio, isPlaying } = useContext(AudioContextCtx);

	if (isLiked) {
		likeButtonClasses.push("liked");
	}

	return (
		<div className="controls">
			<div className="main-controls">
				<button className="previous">
					<FontAwesomeIcon className="prevIcon" icon={faBackward} />
				</button>
				<button className="play-pause" onClick={playAudio}>
					{!isPlaying ? (
						<FontAwesomeIcon className="playIcon" icon={faPlay} />
					) : (
						isPlaying && <FontAwesomeIcon className="playIcon" icon={faPause} />
					)}
				</button>
				<button className="next">
					<FontAwesomeIcon className="nextIcon" icon={faForward} />
				</button>
			</div>
			<div className="player-footer">
				<FontAwesomeIcon
					onClick={() => {
						setIsLiked(!isLiked);
					}}
					className={likeButtonClasses.join(" ")}
					icon={faHeart}
				/>
				<FontAwesomeIcon
					className="shuffleIcon"
					style={{ opacity: "0.5" }}
					icon={faShuffle}
				/>
				<FontAwesomeIcon className="repeatIcon" icon={faArrowRotateRight} />
				<FontAwesomeIcon className="slidersIcon" icon={faSliders} />
			</div>
		</div>
	);
}

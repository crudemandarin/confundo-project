import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";

const detectionToRating = {
	VERY_UNLIKELY: 1,
	UNLIKELY: 2,
	POSSIBLE: 3,
	LIKELY: 4,
	VERY_LIKELY: 5
};

const RatingWidget = ({ label, detectionKey, detections }) => {
	return (
		<div className="flex justify-content-between">
			<div>{label}</div>
			<Rating
				value={detectionToRating[detections[detectionKey]]}
				stars={5}
				cancel={false}
				disabled
			/>
		</div>
	);
};

const DetectionInfoDialog = ({ visible, setVisible, detections }) => {
	const onHide = () => {
		setVisible(false);
	};

	return (
		<Dialog
			header="Vision AI Content Rating"
			style={{ width: "320px" }}
			onHide={onHide}
			visible={visible}
		>
			<div className="post-info-container">
				<RatingWidget
					label={"Adult"}
					detectionKey="adult"
					detections={detections}
				/>
				<div className="s-1" />
				<RatingWidget
					label={"Medical"}
					detectionKey="medical"
					detections={detections}
				/>
				<div className="s-1" />
				<RatingWidget
					label={"Racy"}
					detectionKey="racy"
					detections={detections}
				/>
				<div className="s-1" />
				<RatingWidget
					label={"Spoof"}
					detectionKey="spoof"
					detections={detections}
				/>
				<div className="s-1" />
				<RatingWidget
					label={"Violence"}
					detectionKey="violence"
					detections={detections}
				/>
			</div>
		</Dialog>
	);
};

export default DetectionInfoDialog;

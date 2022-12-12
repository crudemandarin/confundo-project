import { useRef, useState } from "react";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import Util from "../../utils/util";
import DetectionInfoDialog from "./DetectionInfoDialog";
import { statusSelectItems } from "../../utils/config";
import BackEndService from "../../services/backend.service";
import { useApp } from "../../stores/app.store";

const statusColors = {
	approved: {
		background: "#22C55E",
		text: "white"
	},
	"pending-review": {
		background: "#F59E0B",
		text: "white"
	},
	declined: {
		background: "#EF4444",
		text: "white"
	},
	"not-recognized": {
		background: "lightgrey",
		text: "black"
	}
};

const AdminDropdown = ({ post }) => {
	const { getDashboardPosts } = useApp();
	const [value, setValue] = useState(post.status);
	const toast = useRef(null);

	const updatePost = async (newStatus) => {
		await BackEndService.updatePost(post.postId, newStatus);
		getDashboardPosts();
		toast.current.show({
			severity: "success",
			summary: "Update Successful",
			detail: "Post status updated"
		});
	};

	const onChange = (e) => {
		if (!e.value) return;
		setValue(e.value);
		updatePost(e.value);
	};

	return (
		<>
			<Dropdown
				value={value}
				onChange={(e) => onChange(e)}
				placeholder="Select status"
				options={statusSelectItems}
			/>
			<Toast ref={toast} position="bottom-left" />
		</>
	);
};

const StatusWidget = ({ post, admin }) => {
	const [infoVisible, setInfoVisible] = useState(false);
	const { status, detections } = post;

	const onInfoClick = () => {
		setInfoVisible(true);
	};

	const renderStatus = () => {
		if (admin) return <AdminDropdown post={post} />;

		const statusColor = statusColors[status]
			? statusColors[status]
			: statusColors["not-recognized"];
		return (
			<div
				className="post-status"
				style={{
					backgroundColor: statusColor.background,
					color: statusColor.text
				}}
			>
				{Util.statusToString(status)}
			</div>
		);
	};

	return (
		<>
			<div className="flex">
				{renderStatus()}
				<div className="s-2" />
				<Button
					onClick={onInfoClick}
					icon="pi pi-info"
					className="p-button-outlined p-button-secondary p-button-sm"
				/>
			</div>
			<DetectionInfoDialog
				visible={infoVisible}
				setVisible={setInfoVisible}
				detections={detections}
			/>
		</>
	);
};

export default StatusWidget;

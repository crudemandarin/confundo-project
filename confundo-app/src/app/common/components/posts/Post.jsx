import { saveAs } from "file-saver";
import { Button } from "primereact/button";

import Util from "../../utils/util";
import StatusWidget from "./StatusWidget";

const Post = ({ post, status, admin }) => {
	const onCopyClick = () => {
		navigator.clipboard.writeText(post.imageUrl);
	};

	const onDownloadClick = () => {
		saveAs(post.imageUrl);
	};

	const renderStatus = () =>
		status || admin ? (
			<>
				<div className="s-2" />
				<StatusWidget post={post} status={status} admin={admin} />
			</>
		) : undefined;

	return (
		<div className="post">
			<div className="post-left-container">
				<div className="post-image-container">
					<img src={post.imageUrl} />
				</div>
			</div>

			<div className="post-right-container">
				<div>
					<div className="post-title">{post.title}</div>
					<div className="s-1" />
					<div>
						Authored by{" "}
						<span style={{ fontWeight: "bold" }}>{post.userId}</span>
					</div>
					<div className="s-05" />
					<div className="post-date">
						Posted on {Util.getFormattedDate(post.datePosted)}
					</div>
					{renderStatus()}
				</div>
				<div className="s-2" />
				<div className="flex flex-grow" />
				<div className="flex">
					<Button
						onClick={onCopyClick}
						label="Copy Image URL"
						icon="pi pi-copy"
						className="p-button-outlined p-button-info p-button-sm"
					/>
					<div className="s-2" />
					<Button
						onClick={onDownloadClick}
						icon="pi pi-download"
						className="p-button-info p-button-sm"
					/>
				</div>
			</div>
		</div>
	);
};

export default Post;

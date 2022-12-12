import { useEffect, useRef, useState } from "react";

import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { useApp } from "../common/stores/app.store";
import BackEndService from "../common/services/backend.service";

const UploadDialog = ({ visible, setVisible }) => {
	const [postTitle, setPostTitle] = useState("");
	const [image, setImage] = useState(undefined);
	const [uploadDisabled, setUploadDisabled] = useState(true);
	const toast = useRef(null);
	const { userId, getHomePosts, getDashboardPosts, getMyUploads } = useApp();

	useEffect(() => {
		setUploadDisabled(postTitle === "" || image === undefined);
	}, [postTitle, image]);

	const onHide = () => {
		setVisible(false);
		setPostTitle("");
		setImage(undefined);
		setUploadDisabled(true);
	};

	const onUploadClick = async () => {
		setUploadDisabled(true);
		try {
			await BackEndService.createPost(postTitle, userId, image);
			updatePosts();
			onHide();
			toast.current.show({
				severity: "success",
				summary: "Upload Successful",
				detail: "Post successfully created"
			});
		} catch (err) {
			console.error("Error!", err);
			setUploadDisabled(false);
		}
	};

	const updatePosts = () => {
		getHomePosts();
		getMyUploads();
		getDashboardPosts();
	};

	const uploadImageHandler = (e) => {
		const file = e.files[0];
		setImage(file);
	};

	const imageRender = image ? (
		<>
			<div className="post-image-container">
				<img
					src={image.objectURL}
					alt="Image Preview"
					style={{ maxHeight: "300px", maxWidth: "100%" }}
				/>
			</div>
			<div className="s-2" />
		</>
	) : undefined;

	return (
		<>
			<Dialog
				visible={visible}
				style={{ width: "400px" }}
				header="Create a post"
				onHide={() => onHide()}
			>
				{imageRender}
				<div className="flex align-items-center">
					<FileUpload
						accept="image/*"
						mode="basic"
						name="demo"
						customUpload={true}
						uploadHandler={uploadImageHandler}
						auto
					/>
					<div className="s-2" />
					<InputText
						placeholder="Set a title for your post"
						onChange={(e) => setPostTitle(e.target.value)}
						style={{ width: "100%" }}
					/>
				</div>
				<div className="s-2" />
				<Button
					label="Upload"
					value={postTitle}
					disabled={uploadDisabled}
					onClick={onUploadClick}
					icon="pi pi-cloud-upload"
					style={{ width: "100%" }}
				/>
			</Dialog>
			<Toast ref={toast} position="bottom-left" />
		</>
	);
};

export default UploadDialog;

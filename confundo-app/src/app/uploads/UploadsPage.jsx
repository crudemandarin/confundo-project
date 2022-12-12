import { useApp } from "../common/stores/app.store";
import PostFeed from "../common/components/posts/PostFeed";

const UploadsPage = () => {
	const { myUploads, getMyUploads } = useApp();

	return (
		<main>
			<div className="flex justify-content-center">
				<div className="page-title">My Uploads</div>
			</div>
			<div className="s-2" />
			<PostFeed feed={myUploads} updateFeed={getMyUploads} status />
		</main>
	);
};

export default UploadsPage;

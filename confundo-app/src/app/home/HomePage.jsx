import { useApp } from "../common/stores/app.store";
import PostFeed from "../common/components/posts/PostFeed";

const HomePage = () => {
	const { homePosts, getHomePosts } = useApp();

	return (
		<main>
			<div className="page-title-container">
				<div className="page-title">Home Page</div>
			</div>
			<div className="s-2" />
			<PostFeed feed={homePosts} updateFeed={getHomePosts} />
		</main>
	);
};

export default HomePage;

import { useEffect } from "react";
import Post from "./Post";

const PostFeed = ({ feed, updateFeed, status, admin }) => {
	useEffect(() => {
		updateFeed();
	}, []);

	const feedRender = feed.map((post) => (
		<Post post={post} status={status} admin={admin} key={post.postId} />
	));

	return <div className="postfeed">{feedRender}</div>;
};

export default PostFeed;

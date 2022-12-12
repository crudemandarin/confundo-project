import { useEffect, useState } from "react";

import { useApp } from "../common/stores/app.store";
import FilterWidget from "./FilterWidget";
import PostFeed from "../common/components/posts/PostFeed";

const DashboardPage = () => {
	const [filteredPosts, setFilteredPosts] = useState([]);
	const { dashboardPosts, getDashboardPosts } = useApp();

	useEffect(() => {
		setFilteredPosts(dashboardPosts);
	}, [dashboardPosts]);

	return (
		<main>
			<div className="flex justify-content-center">
				<div className="page-title">Admin Dashboard</div>
			</div>

			<div className="s-2" />

			<FilterWidget
				postList={dashboardPosts}
				setFilteredList={setFilteredPosts}
			/>

			<div className="s-2" />

			<PostFeed feed={filteredPosts} updateFeed={getDashboardPosts} admin />
		</main>
	);
};

export default DashboardPage;

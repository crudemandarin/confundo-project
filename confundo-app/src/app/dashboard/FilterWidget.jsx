import { useEffect, useState } from "react";

import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { statusSelectItems } from "../common/utils/config";

const FilterWidget = ({ postList, setFilteredList }) => {
	const [statusList, setStatusList] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");

	const updateFilter = () => {
		const filtered = postList.filter((post) => {
			const includesStatus =
				statusList.length === 0
					? true
					: statusList.includes(post.status.toLowerCase());
			const includesTitle = !title
				? true
				: post.title.toLowerCase().includes(title.toLowerCase());
			const includesAuthor = !author
				? true
				: post.userId.toLowerCase().includes(author.toLowerCase());
			return includesStatus && includesTitle && includesAuthor;
		});
		setFilteredList(filtered);
	};

	useEffect(() => {
		updateFilter();
	}, [postList, statusList, title, author]);

	return (
		<div className="flex justify-content-center align-items-center">
			<div style={{ fontWeight: "bold" }}>Search Posts</div>
			<div className="s-2" />
			<InputText
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<div className="s-1" />
			<InputText
				placeholder="Author"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
			/>
			<div className="s-1" />
			<MultiSelect
				placeholder="Status"
				value={statusList}
				options={statusSelectItems}
				onChange={(e) => setStatusList(e.value)}
			/>
		</div>
	);
};

export default FilterWidget;

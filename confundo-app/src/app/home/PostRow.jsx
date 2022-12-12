const PostRow = ({ post }) => {
	const { imageUrl, datePosted, title, userId } = post;

	return (
		<div
			className="flex"
			style={{ borderTop: "10px solid #D9D9D9", paddingBlock: "1rem" }}
		>
			<div className="flex" style={{ width: "50%", justifyContent: "center" }}>
				<img style={{ width: "50%" }} src={imageUrl} alt={title} />
			</div>

			<div
				className="flex align-items-center"
				style={{
					width: "50%",
					justifyContent: "center",
					flexDirection: "column"
				}}
			>
				<div style={{ fontWeight: "bold" }}>{title}</div>
				<div>Posted by {userId}</div>
				<div>{datePosted}</div>
			</div>
		</div>
	);
};

export default PostRow;

import axios from "axios";
import FormData from "form-data";
import { API_BASE_URL } from "../utils/config";

class BackEndService {
	static async getHomePosts() {
		console.log("BackEndService.getHomePosts invoked");
		const { data } = await axios.get(`${API_BASE_URL}/posts`, {
			params: { status: "approved" }
		});
		console.log("BackEndService.getHomePosts: posts =", data);
		return data;
	}

	static async getMyUploads(userId) {
		console.log("BackEndService.getMyUploads invoked. userId =", userId);
		const { data } = await axios.get(`${API_BASE_URL}/posts`, {
			params: { userId }
		});
		console.log("BackEndService.getMyUploads: data =", data);
		return data;
	}

	static async getPosts() {
		console.log("BackEndService.getPosts invoked");
		const { data } = await axios.get(`${API_BASE_URL}/posts`);
		console.log("BackEndService.getPosts: posts =", data);
		return data;
	}

	static async createPost(title, userId, image) {
		const formData = new FormData();
		formData.append("title", title);
		formData.append("image", image);
		formData.append("userId", userId);
		const headers = { "Content-Type": "multipart/form-data" };
		await axios.post(`${API_BASE_URL}/post`, formData, { headers });
	}

	static async updatePost(postId, status) {
		return await axios.put(`${API_BASE_URL}/post/review`, { postId, status });
	}
}

export default BackEndService;

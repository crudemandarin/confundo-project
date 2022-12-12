const {
	initializeApp,
	applicationDefault,
	cert
} = require("firebase-admin/app");
const {
	getFirestore
} = require("firebase-admin/firestore");
const Util = require("../utils/util");
initializeApp({
	credential: cert("google-cloud-key.json")
});
const db = getFirestore();

class GCFirestoreService {
	static async getPosts() {
		console.info("GCFirestoreService.getPosts invoked");
		const posts = await db.collection("posts").get();
		const postsJson = [];
		posts.forEach((post) => {
			let tmpPost = post.data();
			postsJson.push(tmpPost);
		});
		return postsJson;
	}

	static async getPost(postId) {
		console.info("GCFirestoreService.getPost invoked");
		const doc = await db.collection("posts").doc(postId);
		let tmpPost = await (await doc.get()).data();
		return tmpPost;
	}

    static async getPost(postId) {
        console.info("GCFirestoreService.getPost invoked")
        const doc = await db.collection('posts').doc(postId);
        let tmpPost = await (await doc.get()).data();
        return tmpPost;
    }

    static async createPost(userId, title, imageUrl, status, detections) {
        console.info("GCFirestoreService.createPost invoked")

        let post = { userId, title, imageUrl, status, detections };
        post.datePosted = Util.getDate();

        let postId = Util.generateId();
        post.postId = postId;

        const doc = await db.collection('posts').doc(postId);

        await doc.set(post);
        return post;
    }

    static async updatePost(postId, post) {
        console.info("GCFirestoreService.updatePost invoked")
        const doc = await db.collection('posts').doc(postId);

        await doc.set(post);
        return post;
    }
}

module.exports = GCFirestoreService;

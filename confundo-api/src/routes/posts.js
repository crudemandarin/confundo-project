const express = require("express");
const GCFirestoreService = require("../services/gcfirestore.service");
const router = express.Router();

/* /posts */

/* GET /posts
    * Description: Returns list of all posts
    * Request Query Parameters:
        undefined: Return all posts
        status=approved: Return all posts with status=approved
        userId=<string>: Returns all posts with userId
    * Endpoint Function: Pulls list of all posts. Applies filters if applicable. Returns list.
    * Response Data:
        200: Post[]
        400: Bad request
        500: Failed to get posts
 */

router.get("/", async (req, res) => {
	const { status, userId } = req.query;

	console.info("GET /posts invoked. status =", status, "userId =", userId);

	try {
		let posts = await GCFirestoreService.getPosts();

		if (userId) {
			posts = posts.filter((post) => post.userId == userId);
		}

        if (userId) {
            posts = posts.filter(post => post.userId === userId);
        }

        if (status) {
            posts = posts.filter(post => post.status === status);
        }
        posts = posts.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to get posts" });
    }
});

module.exports = router;

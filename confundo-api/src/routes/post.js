const express = require("express");

const Util = require("../utils/util");
const processFileMiddleware = require("../middleware/processFile");
const GCStorageService = require("../services/gcstorage.service");
const GCFirestoreService = require("../services/gcfirestore.service");
const GCVisionAPIService = require("../services/gcvisionapi.service");

const router = express.Router();

/* /post */

/* POST /post
    * Description: Creates a new post
    * Request Body:
        title: string
        image: File
        userId: userId
    * Endpoint Function: Creates post metadata. Generates unique image ID. Uploads image to GCS bucket. Uploads post metadata to Firestore. Returns result.
    * Response Data:
        200: Post successfully created
        400: Bad request
        500: Failed to create post
 */

router.post("/", processFileMiddleware, async (req, res) => {
    const { file } = req;
    const { title, userId } = req.body;

    console.info("POST /post invoked. title =", title, "userId =", userId, "file =", file)

    if (!title) return res.status(400).json({ message: "`title` string must be included in body form data" });
    if (!userId) return res.status(400).json({ message: "`userId` string must be included in body form data" });
    if (!file) return res.status(400).json({ message: "`image` file must be included in body form data" });

	const date = Util.getDate();

	const { originalname, buffer } = file;
	const fileType = originalname.split(".")[1];
	const filename = `${Util.generateId()}.${fileType}`;

	try {
		const imageUrl = await GCStorageService.uploadImage(filename, buffer);
        const detections = await GCVisionAPIService.safeSearch(imageUrl);
        let status = "pending-review";

        if (detections.adult == "LIKELY" || detections.adult == "VERY_LIKELY" ||
        detections.medical == "LIKELY" || detections.medical == "VERY_LIKELY" ||
        detections.racy == "LIKELY" || detections.racy == "VERY_LIKELY" ||
        detections.spoof == "LIKELY" || detections.spoof == "VERY_LIKELY" ||
        detections.violence == "LIKELY" || detections.violence == "VERY_LIKELY"
        ) {
		    status = "pending-review";
        } else {
		    status = "approved";
        }
        await GCFirestoreService.createPost(userId, title, imageUrl, status, detections);

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Failed to create post" });
	}
    res.status(200).json({ message: "Successfully created a post" });

});

/* PUT /post/review
    * Description: Updates approval status of a post
    * Request Body:
        postId: postId
        status: string
    * Endpoint Function: Gets post metadata. Updates post status. Updates post in Firestore. Returns result.
    * Response Data:
        200: Post successfully updated
        400: Bad request
        500: Failed to update post
 */

router.put("/review", async (req, res) => {
    const { postId, status } = req.body;

    console.info("PUT /post/review invoked. postId =", postId, "status =", status);

    if (!postId) return res.status(400).json({ message: "`postId` string must be included in body form data" });
    if (!status) return res.status(400).json({ message: "`status` file must be included in body form data" });

    try {
        let oldPost = await GCFirestoreService.getPost(postId);
        if (status === "approved") {
            oldPost.status = "approved";
        } else if (status === "declined"){
            oldPost.status = "declined";
        } else if (status === "pending-review"){
            oldPost.status = "pending-review";
        }
        const newpost = await GCFirestoreService.updatePost(postId, oldPost);
        console.log("newpost = ", newpost)
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update post" });
    }

	res.status(200).json({ message: `Successfully updated post ${postId}` });
});

module.exports = router;

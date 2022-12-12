const express = require("express");
const router = express.Router();

const processFileMiddleware = require("../middleware/processFile");
const GCStorageService = require("../services/gcstorage.service");

const Util = require("../utils/util");

/* /file */

/* GET /file */

router.get("/", (_, res) => {
	res.status(200).json({ message: "GET /file" });
});

/* POST /file */

router.post("/", processFileMiddleware, async (req, res) => {
	const { body, file } = req;
	console.log("POST /file invoked", body, file);

	if (!file)
		return res
			.status(400)
			.json({ message: "`image` file must be included in body form data" });

	const { originalname, buffer } = file;
	const fileType = originalname.split(".")[1];
	const filename = `${Util.generateId()}.${fileType}`;

	try {
		await GCStorageService.uploadImage(filename, buffer);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Failed to upload file" });
	}

	res.status(200).json({ message: "POST /file" });
});

module.exports = router;

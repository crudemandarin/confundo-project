const util = require("util");
const Multer = require("multer");

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const processFile = Multer({
	storage: Multer.memoryStorage(),
	limits: { fileSize: MAX_FILE_SIZE }
}).single("image");

const processFileMiddleware = util.promisify(processFile);

module.exports = processFileMiddleware;

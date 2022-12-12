const { Storage } = require("@google-cloud/storage");

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("confundo-image-store");

class GCStorageService {
	static async uploadImage(filename, buffer) {
		console.info("GCStorageService.uploadImage invoked");

		return new Promise((resolve, reject) => {
			const blob = bucket.file(filename);

			const fileType = filename.split(".")[1];
			const contentType = `image/${fileType}`;

			const blobStream = blob.createWriteStream({ resumable: false, metadata: { contentType } });

			blobStream
				.on("error", (err) => {
					console.error(
						"GCStorageService.uploadImage: Image upload failed. Error =",
						err
					);
					reject(err);
				})
				.on("finish", async (_) => {
					const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
					console.log(`Uploaded the file successfully: ${publicUrl}`);
					resolve(publicUrl);
				})
				.end(buffer);
		});
	}

	static async getFiles() {
		console.info("GCStorageService.getFiles invoked");
		const [filesData] = await bucket.getFiles();
		const files = filesData.map((fileData) => ({
			name: fileData.name,
			url: fileData.metadata.mediaLink
		}));
		return files;
	}
}

module.exports = GCStorageService;

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({ keyFilename: "google-cloud-key.json" });

class GCVisionAPIService {
    static async safeSearch(imageUrl) {
        console.info("GCVisionAPIService.safeSearch invoked")
        const [result] = await client.safeSearchDetection(imageUrl);
        const detections = result.safeSearchAnnotation;
        return detections;
    }
}

module.exports = GCVisionAPIService;

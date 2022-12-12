/* Program Entrypoint */

const app = require("./app");

const API_PORT = 8080;

app.listen(API_PORT, () => {
	console.info(`-- API is listening at http://localhost:${API_PORT}`);
});

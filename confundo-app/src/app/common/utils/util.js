import { statusSelectItems } from "./config";

class Util {
	static getFormattedDate(timeInMS) {
		const date = new Date(timeInMS);
		return date.toDateString();
	}

	static statusToString(statusId) {
		const status = statusSelectItems.find((item) => item.value === statusId);
		if (!status) return "Status Not Recognized";
		return status.label;
	}
}

export default Util;

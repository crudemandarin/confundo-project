const { v4 } = require("uuid");

class Util {
    static generateId() {
        return v4();
    }

    static getDate() {
        return Date.now();
    }

}

module.exports = Util;

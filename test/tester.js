class Tester {
    constructor() { }

    isEmpty(obj, res) {
        if (Object.keys(obj).length === 0) {
            this.errorHandler('Object is empty', 500, res)
            return true;
        } else {
            return false;
        }
    }

    errorHandler(name, status, res) {
        res.json({ name, status });
        res.status(500);
    }

    isEqual(obj, fields, res) {
        let reqArray = Object.keys(obj);
        if (reqArray.length === fields.length) {
            for (let i = 0; i < reqArray.length; i++) {
                for (let j = 0; j < fields.length; j++) {
                    if (reqArray[i] === fields[i]) {
                        return true;
                    } else {
                        this.errorHandler('fields are not equal', 500, res);
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    }
}

module.exports = new Tester();
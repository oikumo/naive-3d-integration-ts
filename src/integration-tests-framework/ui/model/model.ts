export class Model {

    static updateCurrentTestInfo() {
        sessionStorage["test_info"] = 'data time: ' + Date.now().toString();
    }

    static getCurrentTestInfo() {
        let value = sessionStorage.getItem("test_info");
        if (value === null) {
            value =  "no info"
            sessionStorage.setItem("test_info", value);
        }

        return value; 
    }
}
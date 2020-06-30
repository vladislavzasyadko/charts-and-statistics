import * as axios from "axios";

let instance = axios.create({
    baseURL:
        "https://raw.githubusercontent.com/kirillzorin/internship2020/master/",
});

export const chartsAPI = {
    getData() {
        return instance.get("data.json");
    },
};

import axios from "utils/axios";

export const apiGetQuestions = async () => {
	try {
		const res = await axios.get("/question/all");
		return res;
	} catch (err: any) {
		throw Error(err);
	}
};

export const apiPutQuestion = async (data: any, id: string) => {
	try {
		const res = await axios.put(`/question?id=${id}`, data);
		return res;
	} catch (err: any) {
		throw Error(err);
	}
};

export const apiDeleteQuestion = async (id: string) => {
	try {
		const res = await axios.delete(`/question?id=${id}`);
		return res;
	} catch (err: any) {
		throw Error(err);
	}
};

export const apiPostQuestion = async (data: any) => {
	try {
		const res = await axios.post("/question", data);
		return res;
	} catch (err: any) {
		throw Error(err);
	}
}
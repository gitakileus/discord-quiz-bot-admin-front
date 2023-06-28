import Home from "pages/Home";
import Questions from "pages/Questions";
import AddQuestion from "pages/AddQuestion"
import { Route, Routes } from "react-router-dom";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/questions" element={<Questions />} />
			<Route path="/add-question" element={<AddQuestion />} />
		</Routes>
	);
};

export default Router;

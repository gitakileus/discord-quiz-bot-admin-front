import { Toaster } from "react-hot-toast";
import Router from "routes";

const App = () => {
	return (
		<div className="App">
			<Router />
			<Toaster />
		</div>
	);
};

export default App;

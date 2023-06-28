import Layout from "layout";

const questions = [
	{
		id: "1",
		title: "What is the capital of Sweden?",
		correct: "Stockholm",
		count: 4,
	},
	{
		id: "2",
		title: "What is the capital of Sweden?",
		correct: "Stockholm",
		count: 4,
	},
];

const Questions = () => {
	return (
		<Layout>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-base font-semibold leading-6 text-gray-900">Questions</h1>
						<p className="mt-2 text-sm text-gray-700">A list of all questions.</p>
					</div>
				</div>
				<div className="mt-8 flow-root">
					<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table className="min-w-full divide-y divide-gray-300">
								<thead>
									<tr>
										<th
											scope="col"
											className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
										>
											Id
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Title
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Correct Answer
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Answer Count
										</th>
										<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{questions.map(question => (
										<tr key={question.id}>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
												{question.id}
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												{question.title}
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												{question.correct}
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												{question.count}
											</td>
											<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
												<a href="#" className="text-indigo-600 hover:text-indigo-900">
													View<span className="sr-only">, {question.id}</span>
												</a>
												<a href="#" className="ml-2 text-indigo-600 hover:text-indigo-900">
													Edit<span className="sr-only">, {question.id}</span>
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Questions;

import { PhotoIcon } from "@heroicons/react/24/solid";
import Layout from "layout";
import { useState } from "react";
import toast from "react-hot-toast";
import { getOrdinal } from "utils";
import { apiPostQuestion } from "utils/question";

interface AnswerProps {
	id: number;
	answer: string;
	correct: boolean;
}

const AddQuestion = () => {
	const [answers, setAnswers] = useState<AnswerProps[]>([{ id: 1, answer: "", correct: false }]);
	const [title, setTitle] = useState<string>("");
	const [correctIndex, setCorrectIndex] = useState<number>(0);
	const [previewSrc, setPreviewSrc] = useState<any>(null);
	const [file, setFile] = useState<any>();

	const handleImageChange = async (e: any) => {
		const file = e.target.files[0];

		if (file) {
			setFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewSrc(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAddMore = () => {
		const newId = answers[answers.length - 1].id + 1;
		setAnswers([...answers, { id: newId, answer: "", correct: false }]);
	};

	const handleAnswerChange = (e: any, index: number) => {
		const answer = e.target.value;
		const newAnswers = [...answers];
		newAnswers[index].answer = answer;
		setAnswers(newAnswers);
	};

	const handleSave = async () => {
		const formData = new FormData();
		formData.append("title", title);
		if (file) {
			formData.append("image", file, file?.name);
		}
		formData.append(
			"answers",
			JSON.stringify([
				...answers.map((answer: any, index: number) => {
					if (index === correctIndex - 1) {
						return {
							id: answer.id,
							answer: answer.answer,
							correct: true,
						};
					} else {
						return {
							id: answer.id,
							answer: answer.answer,
							correct: false,
						};
					}
				}),
			])
		);

		const result = await apiPostQuestion(formData);
		console.log(result);
		if (result.status === 201) {
			toast.success("Question created successfully!");
		}
	};

	return (
		<Layout>
			<h2 className="text-xl font-semibold leading-7 text-gray-900">Add New Question</h2>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This information will be displayed publicly so be careful what you share.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Title
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<input
										type="text"
										name="title"
										id="title"
										value={title}
										onChange={e => setTitle(e.target.value)}
										autoComplete="title"
										className="block flex-1 border-0 bg-transparent px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="What is the capital of Sweden?"
									/>
								</div>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="cover-photo"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Embed Image
							</label>
							{previewSrc ? (
								<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-2">
									<img
										src={previewSrc}
										className="max-h-[200px] w-auto border-4 border-[#1A1C1E]"
										alt="preview"
									/>
								</div>
							) : (
								<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
									<div className="text-center">
										<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
										<div className="mt-4 flex text-sm leading-6 text-gray-600">
											<label
												htmlFor="file-upload"
												className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
											>
												<span>Upload a file</span>
												<input
													id="file-upload"
													name="file-upload"
													type="file"
													accept=".jpg, .jpeg, .png, .bmp, .tif, .tiff, .avif, .svg, .webp"
													className="sr-only"
													onChange={handleImageChange}
												/>
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Answer List</h2>

					<div className="flex w-full flex-col items-center gap-5">
						<div className="mt-5 grid w-full grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
							{answers.map((answer, index) => (
								<div key={answer.id} className="flex items-start gap-3 sm:col-span-3">
									<div className="w-full">
										<label
											htmlFor="first-question"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											{getOrdinal(index)} answer
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="first-question"
												id="first-question"
												autoComplete="given-name"
												onChange={e => handleAnswerChange(e, index)}
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									<div className="flex flex-col items-center">
										<label
											htmlFor="first-question"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Correct
										</label>
										<div className="mt-2">
											<input
												id="push-everything"
												name="push-notifications"
												type="radio"
												defaultChecked={index === correctIndex}
												onChange={() => setCorrectIndex(answer.id)}
												className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>
										</div>
									</div>
								</div>
							))}
						</div>

						<button
							type="button"
							className="rounded-md bg-indigo-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={handleAddMore}
						>
							Add more answer
						</button>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button type="button" className="text-sm font-semibold leading-6 text-gray-900">
					Cancel
				</button>
				<button
					type="button"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					onClick={handleSave}
				>
					Save
				</button>
			</div>
		</Layout>
	);
};

export default AddQuestion;

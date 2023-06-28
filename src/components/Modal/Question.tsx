import { Dialog, Transition } from "@headlessui/react";
import { ASSET_URI } from "config";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getOrdinal } from "utils";
import { apiPutQuestion } from "utils/question";

interface Props {
	data: any;
	editMode: boolean;
	open: boolean;
	refresh: () => void;
	setOpen: (value: boolean) => void;
}

interface AnswerProps {
	id: number;
	answer: string;
	correct: boolean;
}

const QuestionModal: React.FC<Props> = ({ data, editMode, open, setOpen, refresh }) => {
	const [title, setTitle] = useState<string>("");
	const [answers, setAnswers] = useState<AnswerProps[]>([...data.answers]);
	const [correctIndex, setCorrectIndex] = useState<number>(0);
	const [defaultCorrectIndex, setDefaultCorrectIndex] = useState<number>(0);

	const updateAnswer = async () => {
		const newQuestion = {
			title,
			answers: answers.map((answer: any, index: number) => {
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
		};

		const result = await apiPutQuestion(newQuestion, data._id);
		console.log(result.status === 200);
		if (result.status === 200) {
			toast.success("Question updated successfully!");
		}
		await refresh();
		setOpen(false);
	};

	const handleTitleChange = (e: any) => {
		setTitle(e.target.value);
	};

	const handleAnswerChange = (e: any, index: number) => {
		const answer = e.target.value;
		const newAnswers = [...answers];
		newAnswers[index].answer = answer;
		setAnswers(newAnswers);
	};

	useEffect(() => {
		setTitle(data.title);
		const correct = data.answers.find((answer: any) => answer.correct);
		console.log(correct);
		if (correct) {
			setCorrectIndex(correct.id);
			setDefaultCorrectIndex(correct.id);
		}
	}, [data]);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative w-[500px] transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
								<div>
									{!data.embededImage || data.embededImage === "" ? (
										<></>
									) : (
										<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-2">
											<img
												src={`${ASSET_URI}${data?.embededImage}`}
												alt="embeded"
												className="h-[200px] w-auto object-cover"
											/>
										</div>
									)}
									<div className="mt-3 text-center sm:mt-5">
										<Dialog.Title
											as="h3"
											className="text-base font-semibold leading-6 text-gray-900"
										>
											<label
												htmlFor="email"
												className="block text-left text-base font-medium leading-6 text-gray-900"
											>
												Question
											</label>
											<input
												type="text"
												name="title"
												id="title"
												value={title}
												readOnly={editMode ? false : true}
												onChange={handleTitleChange}
												className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</Dialog.Title>
										<div className="mt-2 flex flex-col items-start">
											<label
												htmlFor="email"
												className="block text-base font-medium leading-6 text-gray-900"
											>
												Answer List
											</label>
											<div className="relative w-full rounded-md shadow-sm">
												{answers.map((answer: any, index: number) => (
													<div className="mt-1 flex items-center gap-3 sm:col-span-3">
														<div className="w-full">
															<label
																htmlFor="first-question"
																className="block text-left text-sm font-medium leading-6 text-gray-900"
															>
																{getOrdinal(index)} answer
															</label>
															<input
																type="text"
																name="first-question"
																id="first-question"
																autoComplete="given-name"
																value={answer.answer}
																readOnly={editMode ? false : true}
																onChange={e => handleAnswerChange(e, index)}
																className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
															/>
														</div>
														<div className="flex flex-col items-center">
															<label
																htmlFor="first-question"
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Correct
															</label>
															{editMode ? (
																<input
																	id="push-everything"
																	name="push-notifications"
																	type="radio"
																	defaultChecked={correctIndex === answer.id}
																	onChange={() => setCorrectIndex(answer.id)}
																	className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
																/>
															) : (
																<input
																	id="push-everything"
																	name="push-notifications"
																	type="radio"
																	checked={defaultCorrectIndex === answer.id}
																	readOnly
																	className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
																/>
															)}
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
								<div className="mt-2 flex gap-2 sm:mt-3">
									{editMode && (
										<button
											type="button"
											className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											onClick={updateAnswer}
										>
											Update
										</button>
									)}
									<button
										type="button"
										className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
										onClick={() => setOpen(false)}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default QuestionModal;

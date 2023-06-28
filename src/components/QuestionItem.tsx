import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiDeleteQuestion } from "utils/question";

import QuestionModal from "./Modal/Question";

interface Props {
	question: any;
	index: number;
	refresh: () => void;
}

const QuestionItem: React.FC<Props> = ({ refresh, question, index }) => {
	const [open, setOpen] = useState<boolean>(false);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [correctAnswer, setCorrectAnswer] = useState<string>("");
	const handleView = () => {
		setOpen(true);
		setEditMode(false);
	};

	const handleEdit = () => {
		setOpen(true);
		setEditMode(true);
	};

	const handleDelete = async () => {
		const deleteConfirm = window.confirm("Are you sure you want to delete this question?");
		if (!deleteConfirm) return;
		const result = await apiDeleteQuestion(question._id);
		console.log(result);
		if (result.status === 200) {
			toast.success("Question deleted successfully!");
		}
		refresh();
	};

	useEffect(() => {
		const correct = question.answers.find((answer: any) => answer.correct);
		console.log(correct);
		if (correct) {
			setCorrectAnswer(correct.answer);
		}
	}, [question]);

	return (
		<>
			<tr>
				<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
					{index + 1}
				</td>
				<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{question.title}</td>
				<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{correctAnswer}</td>
				<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
					{question.answers.length}
				</td>
				<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
					<span className="cursor-pointer text-blue-600 hover:text-blue-900" onClick={handleView}>
						View<span className="sr-only">, {question.id}</span>
					</span>
					<span
						className="ml-2 cursor-pointer text-indigo-600 hover:text-indigo-900"
						onClick={handleEdit}
					>
						Edit<span className="sr-only">, {question.id}</span>
					</span>
					<span
						className="ml-2 cursor-pointer text-red-600 hover:text-red-900"
						onClick={handleDelete}
					>
						Delete<span className="sr-only">, {question.id}</span>
					</span>
				</td>
			</tr>

			<QuestionModal
				data={question}
				editMode={editMode}
				open={open}
				setOpen={(value: boolean) => setOpen(value)}
				refresh={refresh}
			/>
		</>
	);
};

export default QuestionItem;

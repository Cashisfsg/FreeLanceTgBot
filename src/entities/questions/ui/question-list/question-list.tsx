import { QuestionListItem } from "./question-list-item";

import { Question } from "../../api";

interface QuestionListProps {
    questions: Question[] | undefined;
}

export const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
    return (
        <>
            {questions?.map(question => (
                <QuestionListItem question={question} />
            ))}
        </>
    );
};

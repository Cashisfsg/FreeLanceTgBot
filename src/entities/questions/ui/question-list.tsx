import { cnBase } from "tailwind-variants";
import { Question } from "../api";
import { QuestionListItem } from "./question-list-item";

interface QuestionListProps
    extends Omit<React.ComponentProps<"ul">, "children"> {
    questions: Question[];
}

export const QuestionList: React.FC<QuestionListProps> = ({
    className,
    questions
}) => {
    return (
        <ul className={cnBase("", className)}>
            {questions.map(question => (
                <fieldset key={question.id}>
                    <>
                        {question.options.map(option => (
                            <ul>
                                <li>
                                    <QuestionListItem question={option} />
                                </li>
                            </ul>
                        ))}
                    </>
                </fieldset>
            ))}
        </ul>
    );
};

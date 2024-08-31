import { Input } from "@/shared/ui/input/input";

import { FetchQuestions } from "@/entities/questions";
import { QuestionList } from "@/entities/questions/ui/question-list";

export const ApplicationCategoryPage = () => {
    return (
        <>
            Application category page
            <FetchQuestions
                renderSuccess={sections => (
                    <QuestionList
                        questions={
                            sections.find(
                                section => section.name === "bot_category"
                            )!.questions
                        }
                    />
                )}
            />
            <Input
                variant="text"
                className=""
                placeholder="Some text"
            />
        </>
    );
};

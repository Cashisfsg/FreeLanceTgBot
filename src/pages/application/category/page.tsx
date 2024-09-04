import { FetchQuestions } from "@/entities/questions";
import { QuestionList } from "@/entities/questions/ui/question-list";

export const ApplicationCategoryPage = () => {
    return (
        <main>
            <form className="space-y-8">
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
            </form>
        </main>
    );
};

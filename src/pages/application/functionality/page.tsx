import { FetchQuestions, QuestionList } from "@/entities/questions";

export const ApplicationFunctionalityPage = () => {
    return (
        <main>
            <form className="space-y-8">
                <FetchQuestions
                    renderSuccess={sections => (
                        <QuestionList
                            questions={
                                sections.find(
                                    section => section.name === "functionality"
                                )!.questions
                            }
                        />
                    )}
                />
            </form>
        </main>
    );
};

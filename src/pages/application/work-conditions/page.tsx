import { FetchQuestions, QuestionList } from "@/entities/questions";

export const ApplicationWorkConditionsPage = () => {
    return (
        <main>
            <form className="space-y-8">
                <FetchQuestions
                    renderSuccess={sections => (
                        <QuestionList
                            questions={
                                sections.find(
                                    section =>
                                        section.name === "work_conditions"
                                )!.questions
                            }
                        />
                    )}
                />
            </form>
        </main>
    );
};

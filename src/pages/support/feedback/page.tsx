import { useId } from "react";

import { SendFeedbackForm } from "@/features/user/send-feedback";
import { HeaderGroup } from "@/shared/ui/header-group";
import { Button } from "@/shared/ui/button";

export const FeedbackPage = () => {
    const formId = `form-${useId()}`;

    return (
        <>
            <HeaderGroup.Root>
                <HeaderGroup.Title>
                    What do you think about BotFreelance
                </HeaderGroup.Title>
                <HeaderGroup.SubTitle>lorem ipsum</HeaderGroup.SubTitle>
            </HeaderGroup.Root>

            <main className="flex flex-col gap-y-8">
                <SendFeedbackForm id={formId} />

                <Button form={formId}>Submit feedback</Button>
            </main>
        </>
    );
};

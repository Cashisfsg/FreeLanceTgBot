import { useId } from "react";

import { MakeProposalForm } from "@/features/user/make-proposal";
import { HeaderGroup } from "@/shared/ui/header-group";
import { Button } from "@/shared/ui/button";

export const ProposalPage = () => {
    const formId = `form-${useId()}`;

    return (
        <>
            <HeaderGroup.Root>
                <HeaderGroup.Title>
                    We always happy to meet new ideas
                </HeaderGroup.Title>
                <HeaderGroup.SubTitle>lorem</HeaderGroup.SubTitle>
            </HeaderGroup.Root>

            <main className="flex flex-col gap-y-8">
                <MakeProposalForm id={formId} />

                <Button form={formId}>Share an idea</Button>
            </main>
        </>
    );
};

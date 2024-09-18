import { useId } from "react";

import { ReportIssueForm } from "@/features/user/report-issue";
import { HeaderGroup } from "@/shared/ui/header-group";
import { Button } from "@/shared/ui/button";

export const IssuePage = () => {
    const formId = `form-${useId()}`;

    return (
        <>
            <HeaderGroup.Root>
                <HeaderGroup.Title>
                    What problem are you facing?
                </HeaderGroup.Title>
                <HeaderGroup.SubTitle>lorem</HeaderGroup.SubTitle>
            </HeaderGroup.Root>

            <main className="flex flex-col gap-y-8">
                <ReportIssueForm id={formId} />

                <Button form={formId}>Report a bug</Button>
            </main>
        </>
    );
};

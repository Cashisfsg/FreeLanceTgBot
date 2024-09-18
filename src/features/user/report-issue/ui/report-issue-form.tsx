import { useNavigate } from "react-router-dom";

import { cnBase } from "tailwind-variants";

import { TextArea } from "@/shared/ui/input/textarea";
import { FileUploader } from "@/shared/ui/file-uploader";
import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

interface ReportIssueFormProps extends React.ComponentPropsWithoutRef<"form"> {}

export const ReportIssueForm: React.FC<ReportIssueFormProps> = ({
    className,
    onSubmit,
    ...props
}) => {
    const navigate = useNavigate();

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();

        navigate("/support/appreciation");
    };

    return (
        <form
            className={cnBase("flex-auto space-y-3", className)}
            onSubmit={composeEventHandlers(onSubmit, onSubmitHandler)}
            {...props}
        >
            <TextArea placeholder="Write your issue here" />

            <FileUploader
                buttonText="Attach files"
                // className="bg-white px-4 py-3 shadow-md"
            />
        </form>
    );
};

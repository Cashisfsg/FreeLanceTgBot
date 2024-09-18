import { useNavigate } from "react-router-dom";

import { cnBase } from "tailwind-variants";

import { TextArea } from "@/shared/ui/input/textarea";
import { FileUploader } from "@/shared/ui/file-uploader";
import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

interface MakeProposalFormProps
    extends React.ComponentPropsWithoutRef<"form"> {}

export const MakeProposalForm: React.FC<MakeProposalFormProps> = ({
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
            <TextArea placeholder="Write your idea here" />

            <FileUploader
                buttonText="Attach files"
                className="bg-white px-4 py-3 shadow-md"
            />
        </form>
    );
};

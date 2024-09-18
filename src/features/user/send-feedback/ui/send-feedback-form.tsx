import { useNavigate } from "react-router-dom";

import { cnBase } from "tailwind-variants";

import { TextArea } from "@/shared/ui/input/textarea";
import { StarRating } from "@/shared/ui/star-rating";

import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

interface SendFeedbackFormProps extends React.ComponentPropsWithRef<"form"> {}

export const SendFeedbackForm: React.FC<SendFeedbackFormProps> = ({
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
            className={cnBase("flex-auto space-y-4", className)}
            onSubmit={composeEventHandlers(onSubmit, onSubmitHandler)}
            {...props}
        >
            <StarRating name="name" />

            <TextArea placeholder="Write your feedback here" />
        </form>
    );
};

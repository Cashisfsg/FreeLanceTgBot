import { Button, ButtonVariants } from "@/shared/ui/button";
import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

interface CreateOrderButtonProps
    extends React.ComponentPropsWithoutRef<"button">,
        ButtonVariants {}

export const CreateOrderButton: React.FC<CreateOrderButtonProps> = ({
    onClick,
    ...props
}) => {
    const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {};

    return (
        <Button
            onClick={composeEventHandlers(onClick, onClickHandler)}
            {...props}
        >
            Create a new order
        </Button>
    );
};

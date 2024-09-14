import { composeEventHandlers } from "@/shared/lib/compose-event-handlers";

interface SwitchProps
    extends Omit<React.ComponentPropsWithoutRef<"button">, "role"> {}

export const Switch: React.FC<SwitchProps> = ({
    type = "button",
    onClick,
    ...props
}) => {
    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        const button = event.currentTarget;

        const checked = button.getAttribute("aria-checked") === "true";

        button.setAttribute("aria-checked", String(!checked));
    };

    return (
        <button
            {...props}
            role="switch"
            type={type}
            aria-checked={false}
            onClick={composeEventHandlers(onClick, onClickHandler)}
        />
    );
};

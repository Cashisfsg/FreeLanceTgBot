import { badgeVariants, type BadgeVariants } from "./badge-variants";

type TagType<E extends React.ElementType = React.ElementType> = Partial<
    Record<"as", E>
>;

type BadgeProps<E extends React.ElementType> = TagType<E> &
    Omit<React.ComponentPropsWithoutRef<E>, keyof TagType> &
    BadgeVariants;

export const Badge = <E extends React.ElementType = "div">({
    as,
    className,
    variant,
    ...props
}: BadgeProps<E>) => {
    const TagName = as || "div";

    return (
        <TagName
            className={badgeVariants({ variant, className })}
            {...props}
        />
    );
};

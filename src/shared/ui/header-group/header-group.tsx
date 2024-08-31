import {
    headerGroupVariants,
    type HeaderGroupVariants
} from "./header-group-variants";

import {
    HeaderGroupContext,
    useHeaderGroupContext
} from "./use-header-group-context";

type TitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleGroupProps extends React.PropsWithChildren, HeaderGroupVariants {
    className?: string;
}

export const Root: React.FC<TitleGroupProps> = ({
    variant,
    className,
    ...props
}) => {
    const { group } = headerGroupVariants({ variant });
    return (
        <HeaderGroupContext.Provider value={{ variant: variant }}>
            <hgroup
                className={group({ className: className })}
                {...props}
            />
        </HeaderGroupContext.Provider>
    );
};

type AsProps<E extends React.ElementType = React.ElementType> = Partial<
    Record<"as", E>
> &
    HeaderGroupVariants;

type TitleProps<E extends React.ElementType> = AsProps<E> &
    Omit<React.ComponentProps<E>, keyof AsProps>;

export const Title = <E extends TitleType = TitleType>({
    as,
    className,
    ...props
}: TitleProps<E>) => {
    const { variant } = useHeaderGroupContext();

    const TagName = as || "h1";

    const { title } = headerGroupVariants({ variant });

    return (
        <TagName
            className={title({ className: className })}
            {...props}
        />
    );
};

interface SubTitleProps extends React.ComponentProps<"p"> {}

export const SubTitle: React.FC<SubTitleProps> = ({ className, ...props }) => {
    const { variant } = useHeaderGroupContext();

    const { subtitle } = headerGroupVariants({ variant });

    return (
        <p
            className={subtitle({ className: className })}
            {...props}
        />
    );
};

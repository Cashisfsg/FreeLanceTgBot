import React, { useState, useId, useRef } from "react";

import {
    SelectContext,
    useSelectContext,
    type Option
} from "./use-select-context";

interface RootProps extends React.ComponentPropsWithoutRef<"div"> {
    options: Option[];
}

export const Root: React.FC<RootProps> = ({ options, children, ...props }) => {
    const [selectedOptions, setSelectedOptions] = useState(options);
    const optionsListId = `options-list-${useId()}`;
    const defaultOptions = useRef(options);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <SelectContext.Provider
            value={{
                selectedOptions,
                setSelectedOptions,
                defaultOptions,
                optionsListId,
                inputRef
            }}
        >
            <div {...props}>
                <input
                    hidden
                    ref={inputRef}
                />
                {children}
            </div>
        </SelectContext.Provider>
    );
};

export const Search = () => {
    // const onChangeHandler: React.ChangeEventHandler<
    //     HTMLInputElement
    // > = event => {
    //     options.filter(
    //         option => option.label.toLowerCase() === event?.currentTarget.value
    //     );
    // };

    return (
        <search>
            <input
                type="search"
                aria-label="Search necessary values"
                // onChange={onChangeHandler}
            />
        </search>
    );
};

interface OptionListProps
    extends Omit<
        React.ComponentPropsWithoutRef<"ul">,
        "id" | "role" | "children"
    > {
    renderOptions: (options: Option[]) => React.ReactElement;
}

export const OptionsList: React.FC<OptionListProps> = ({
    renderOptions,
    ...props
}) => {
    const { optionsListId, defaultOptions } = useSelectContext();

    const optionsList = renderOptions(defaultOptions.current);
    const children = optionsList.props.children;

    return React.cloneElement(optionsList, {
        id: optionsListId,
        role: "listbox",
        children: React.Children.map(children, child =>
            React.cloneElement(child, { role: "option" })
        ),
        ...props
    });
};

// export const OptionListitem = () => {
//     return <li role="option" />;
// };

export const SelectedOptionsList = () => {
    return <ul></ul>;
};

interface HorizontalProgressbar {
    orientation?: "horizontal";
    width: number;
    height?: never;
}

interface VerticalProgressbar {
    orientation: "vertical";
    width?: never;
    height: number;
}

type Progressbar = HorizontalProgressbar | VerticalProgressbar;

type ProgressBarProps = Omit<
    React.ComponentPropsWithoutRef<"svg">,
    | "aria-valuemin"
    | "aria-valuemax"
    | "aria-valuenow"
    | "aria-valuetext"
    | "children"
    | "role"
> & {
    // width: number;
    min: number;
    max: number;
    value: number;
    step: number;
    valueText: string;
} & Progressbar;

export const ProgressBar: React.FC<ProgressBarProps> = ({
    orientation = "horizontal",
    height,
    min,
    max,
    step,
    value,
    valueText,
    width,
    ...props
}) => {
    if (orientation === "horizontal")
        return (
            <svg
                height="28"
                viewBox={`0 0 ${width} 28`}
                xmlns="http://www.w3.org/2000/svg"
                role="progressbar"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={valueText}
                {...props}
            >
                <rect
                    x="14"
                    y="12.5"
                    width={width - 28}
                    height="3"
                    fill="#cbcbcb"
                />
                <rect
                    x="14"
                    y="12.5"
                    width={(width - 28) * ((value - step) / (max - min))}
                    height="3"
                    fill="#007aff"
                    className="transition-all duration-300"
                />
                {/* <circle
                cx={14 + (width - 28) * ((value - step) / (max - min))}
                cy="14"
                r="14"
                fill="#4378ff"
                fillOpacity="0.1"
            /> */}
                {Array.from(
                    { length: Math.ceil((max - min) / step) + 1 },
                    (_, index) => (
                        <circle
                            key={index}
                            cx={
                                14 +
                                (width - 28) * ((index * step) / (max - min))
                            }
                            cy="14"
                            r="7"
                            fill={index * step < value ? "#007aff" : "#cbcbcb"}
                            strokeWidth="14"
                            stroke={
                                (index + 1) * step === value
                                    ? "#4378ff1A"
                                    : undefined
                            }
                        />
                    )
                )}
            </svg>
        );

    if (orientation === "vertical")
        return (
            <svg
                height={height}
                viewBox={`0 0 28 ${height}`}
                xmlns="http://www.w3.org/2000/svg"
                role="progressbar"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={valueText}
                {...props}
            >
                <rect
                    x="12.5"
                    y="14"
                    width="3"
                    height={height - 28}
                    fill="#cbcbcb"
                />
                <rect
                    x="12.5"
                    y="14"
                    height={(height - 28) * ((value - step) / (max - min))}
                    width="3"
                    fill="#007aff"
                    className="transition-all duration-300"
                />

                {Array.from(
                    { length: Math.ceil((max - min) / step) + 1 },
                    (_, index) => (
                        <circle
                            key={index}
                            cx="14"
                            cy={
                                14 +
                                (height - 28) * ((index * step) / (max - min))
                            }
                            r="7"
                            fill={index * step < value ? "#007aff" : "#cbcbcb"}
                            strokeWidth="14"
                            stroke={
                                (index + 1) * step === value
                                    ? "#4378ff1A"
                                    : undefined
                            }
                        />
                    )
                )}
            </svg>
        );
};

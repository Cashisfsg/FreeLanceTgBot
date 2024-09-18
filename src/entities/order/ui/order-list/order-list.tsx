import { cnBase } from "tailwind-variants";

import { OrderCard } from "../order-card";

interface OrderListProps extends React.ComponentPropsWithoutRef<"ul"> {}

export const OrderList: React.FC<OrderListProps> = ({
    className,
    ...props
}) => {
    return (
        <ul
            className={cnBase("", className)}
            {...props}
        >
            {Array.from({ length: 5 }, (_, i) => (
                <li key={i}>
                    <OrderCard />
                </li>
            ))}
        </ul>
    );
};

import { cnBase } from "tailwind-variants";

import { Badge } from "@/shared/ui/badge";

interface OrderCardProps extends React.ComponentPropsWithoutRef<"article"> {}

export const OrderCard: React.FC<OrderCardProps> = ({
    className,
    ...props
}) => {
    return (
        <article
            className={cnBase(
                "space-y-3 border-t border-black/15 bg-inherit p-4 text-sm text-[#707579]",
                className
            )}
            {...props}
        >
            <header>
                <hgroup className="space-y-3">
                    <p className="flex items-center gap-x-3">
                        <Badge as="span">On the moderation</Badge>
                        <span>
                            Posted <time>5 hours</time> ago
                        </span>
                    </p>
                    <h3 className="text-2xl/7 font-bold text-black">
                        Mini-app for cloth store
                    </h3>
                </hgroup>
            </header>

            <dl className="flex items-center justify-evenly gap-x-10">
                <div>
                    <dt>Budget</dt>
                    <dd className="mt-0.5 text-base/5 font-semibold text-[#31D158]">
                        $$$
                    </dd>
                </div>
                <div>
                    <dt>Priority</dt>
                    <dd className="mt-0.5 text-base/5 font-semibold text-[#e53935]">
                        Hight
                    </dd>
                </div>
                <div>
                    <dt>Type</dt>
                    <dd className="mt-0.5 text-base/5 font-semibold text-black">
                        Mini app
                    </dd>
                </div>
            </dl>

            <p className="text-pretty">
                Looking for freelancers to collaborate on a project related to
                mini apps and chat bots on the Telegram platform. If you need a
                little more info, feel free to reach out!
            </p>

            <ul className="flex items-center gap-x-3">
                <Badge
                    as="li"
                    variant="secondary"
                >
                    Designed
                </Badge>
                <Badge
                    as="li"
                    variant="secondary"
                >
                    Frontend developer
                </Badge>
                <Badge
                    as="li"
                    variant="secondary"
                >
                    Backend developer
                </Badge>
            </ul>
        </article>
    );
};

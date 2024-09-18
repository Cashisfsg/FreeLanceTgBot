import { Link } from "react-router-dom";

import { HeaderGroup } from "@/shared/ui/header-group";
import { buttonVariants } from "@/shared/ui/button";

const links = [
    {
        path: "/support/feedback",
        label: "I have a feedback 👀"
    },
    {
        path: "/support/issue",
        label: "I found a bug 🐞"
    },
    {
        path: "/support/proposal",
        label: "I want to share idea 💡"
    }
];

export const SupportPage = () => {
    return (
        <>
            <HeaderGroup.Root>
                <HeaderGroup.Title>What do you think?</HeaderGroup.Title>
                <HeaderGroup.SubTitle>Help us improve</HeaderGroup.SubTitle>
            </HeaderGroup.Root>

            <main>
                <nav className="text-center">
                    <ul className="space-y-3">
                        {links.map(link => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={buttonVariants({
                                        variant: "secondary"
                                    })}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </main>
        </>
    );
};

import { Link } from "react-router-dom";

import { buttonVariants } from "@/shared/ui/button";

export const MainPage = () => {
    return (
        <>
            <header className="grid grid-cols-[minmax(min-content,_auto)_1fr] grid-rows-[repeat(2,_minmax(min-content,_auto))] gap-x-6 gap-y-1">
                <img
                    src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                    alt="Profile photo"
                    height="96"
                    width="96"
                    className="row-span-2 size-24 rounded-full object-cover"
                />
                <h2 className="mt-4 self-end truncate font-secondary text-4xl font-bold capitalize tracking-wide">
                    Anthony Gray
                </h2>
                <p className="mb-4 self-start text-base/snug tracking-tight text-[#707579]">
                    Novice Client
                </p>
            </header>
            <main className="mt-8">
                <hgroup className="space-y-4 text-pretty sm:text-center">
                    <h1 className="text-4xl/10 font-bold">
                        Let’s start with your first job post
                    </h1>
                    <p className="text-base/snug tracking-tight">
                        The fastest way to find talents. Get help from AI
                    </p>
                </hgroup>

                <nav className="mt-12">
                    <ul className="flex flex-col gap-x-4 gap-y-4 text-center sm:flex-row">
                        <li className="contents">
                            <Link
                                to="/application/category"
                                className={buttonVariants({
                                    className: "block flex-1"
                                })}
                            >
                                Get started with interactive form
                            </Link>
                        </li>
                        <li className="contents">
                            <Link
                                to="/"
                                className={buttonVariants({
                                    variant: "secondary",
                                    className: "block flex-1"
                                })}
                            >
                                Quick start (Premium feature)
                            </Link>
                        </li>
                    </ul>
                </nav>
            </main>
        </>
    );
};

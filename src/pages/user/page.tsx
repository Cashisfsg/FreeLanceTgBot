import { OrderList } from "@/entities/order/ui/order-list";
import { CreateOrderButton } from "@/features/order/create-order";

export const UserPage = () => {
    return (
        <>
            <header>
                <img
                    src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                    alt=""
                    height={96}
                    width={96}
                    className="mx-auto block size-24 rounded-full object-cover"
                />

                <hgroup className="mt-5 space-y-1 text-center">
                    <p className="text-lg/5.5 font-medium tracking-tight">
                        Client
                    </p>
                    <h2 className="truncate font-secondary text-4xl font-bold tracking-wide">
                        Anthony Gray
                    </h2>
                    <p className="text-lg/5.5 font-medium tracking-tight text-[#707579]">
                        My raying: 4.3
                    </p>
                </hgroup>
            </header>

            <CreateOrderButton className="mx-auto w-max" />

            <main>
                <section className="rounded-xl bg-white">
                    <header className="p-4 pb-2 uppercase">
                        <h2 className="text-sm/4 text-[#707579]">
                            Orders history
                        </h2>
                    </header>
                    <OrderList />
                </section>
            </main>
        </>
    );
};

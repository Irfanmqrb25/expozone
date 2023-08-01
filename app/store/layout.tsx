import CreateStoreModal from "@/components/modal/CreateStoreModal";
import getCurrentUser from "@/lib/session";
import { Fredoka } from "next/font/google";
import getStore from "@/actions/getStore";
import MainNav from "@/components/navbar/MainNav";
import StoreTabs from "./StoreTabs";
import Container from "@/components/Container";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/cart";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await getStore();
  const session = await getCurrentUser();
  const cart = await getCart();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className={fredoka.className}>
      <CreateStoreModal />
      <MainNav session={session} store={store} cart={cart} />
      <Container>
        <div className="pt-20">
          {store ? (
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-8 h-8 overflow-hidden border-2 border-gray-300 rounded-full md:w-10 md:h-10">
                <Image
                  src={store?.image || "/assets/blank-user.jpg"}
                  alt="Store Profile"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <p className="text-2xl font-medium">{store?.name}</p>
            </div>
          ) : null}
          <div className="mb-5">
            <StoreTabs />
          </div>
          {children}
        </div>
      </Container>
    </div>
  );
}

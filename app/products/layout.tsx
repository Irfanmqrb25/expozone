import CreateStoreModal from "@/components/modal/CreateStoreModal";
import getCurrentUser from "@/lib/session";
import { Fredoka } from "next/font/google";
import getStore from "@/actions/getStore";
import MainNav from "@/components/navbar/MainNav";
import { Toaster } from "@/components/ui/toaster";
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

  return (
    <div className={fredoka.className}>
      <CreateStoreModal />
      <MainNav session={session} store={store} cart={cart} />
      <div>{children}</div>
      <Toaster />
    </div>
  );
}

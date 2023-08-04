import CreateStoreModal from "@/components/modal/CreateStoreModal";
import getCurrentUser from "@/lib/session";
import { Fredoka } from "next/font/google";
import getStore from "@/actions/getStore";
import MainNav from "@/components/navbar/MainNav";
import { Toaster } from "@/components/ui/toaster";
import { getCart } from "@/actions/cart";
import Container from "@/components/Container";
import Filter from "@/components/input/Filter";

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
      <Container>
        <div className="flex flex-col min-h-screen gap-5 pt-20">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <p className="text-3xl font-medium">Products</p>
              <p className="text-muted-foreground">
                Buy the product you need here.
              </p>
            </div>
            <div className="mt-2">
              <Filter />
            </div>
          </div>
          <div>{children}</div>
        </div>
      </Container>
      <Toaster />
    </div>
  );
}

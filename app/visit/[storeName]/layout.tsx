import { getCart } from "@/actions/cart";
import Container from "@/components/Container";
import MainNav from "@/components/navbar/MainNav";
import getCurrentUser from "@/lib/session";
import { Fredoka } from "next/font/google";
import getStorebyName from "@/actions/getStoreByName";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Menu from "./Menu";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

interface IParams {
  storeName: string;
}

export default async function Layout({
  params,
  children,
}: {
  params: IParams;
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  const cart = await getCart();

  const capitalizeWords = (str: string) => {
    return str.split("-").join(" ");
  };

  const storeUrl = capitalizeWords(params.storeName);

  const store = await getStorebyName({ storeName: storeUrl });

  const storeUrlpath =
    store.name.split(" ").length > 1
      ? store.name.replace(/\s+/g, "-")
      : store.name;

  return (
    <div className={fredoka.className}>
      <MainNav session={session} cart={cart} />
      <Container>
        <div className="min-h-screen pt-20">
          <Card className="p-4 border-2 border-black">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <div className="flex items-center justify-center gap-3 xl:justify-start">
                <Avatar className="w-12 h-12 border-2 border-black">
                  <AvatarImage
                    className="object-cover"
                    src={store?.image || "/assets/blank-user.jpg"}
                  />
                </Avatar>
                <p className="text-2xl font-medium">{store.name}</p>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                {store.city}, {store?.country}
              </div>
            </div>
          </Card>
          <Menu params={storeUrlpath} />
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}

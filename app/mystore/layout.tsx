import CreateStoreModal from "@/components/modal/CreateStoreModal";
import getCurrentUser from "@/lib/session";
import { Fredoka } from "next/font/google";
import Header from "./Header";
import getStore from "@/actions/getStore";
import MainNav from "@/components/navbar/MainNav";

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
  const session = await getCurrentUser();
  const store = await getStore();
  return (
    <div className={fredoka.className}>
      <CreateStoreModal />
      <MainNav session={session} />
      <Header store={store} />
      <div>{children}</div>
    </div>
  );
}

import CreateStoreModal from "@/components/modal/CreateStoreModal";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/lib/session";
import { Fredoka } from "next/font/google";
import getStore from "../actions/getStore";

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
  return (
    <div className={fredoka.className}>
      <CreateStoreModal />
      <Navbar session={session} store={store} />
      <div>{children}</div>
    </div>
  );
}

import { getCart } from "@/actions/cart";
import Container from "@/components/Container";
import MainNav from "@/components/navbar/MainNav";
import getCurrentUser from "@/lib/session";
import { Fredoka } from "next/font/google";

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
  const cart = await getCart();
  return (
    <div className={fredoka.className}>
      <MainNav session={session} cart={cart} />
      <Container>
        <div className="pt-20">{children}</div>
      </Container>
    </div>
  );
}

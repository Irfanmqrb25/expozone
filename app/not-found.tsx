import Link from "next/link";
import { Fredoka } from "next/font/google";

import MainNav from "@/components/navbar/MainNav";
import Container from "@/components/Container";

import { getCart } from "@/actions/cart";
import getStore from "@/actions/getStore";
import getCurrentUser from "@/lib/session";
import clsx from "clsx";
import Image from "next/image";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

export default async function NotFound() {
  const session = await getCurrentUser();
  const cart = await getCart();
  const store = await getStore();
  return (
    <div className={clsx(fredoka.className)}>
      <MainNav session={session} store={store} cart={cart} />
      <div className="py-40">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/assets/not-found.jpg"
              alt=""
              width={400}
              height={400}
            />
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-3xl font-semibold">Page Not Found</h1>
              <Link href="/" className="px-2 py-1 text-white bg-black rounded">
                Go Back
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

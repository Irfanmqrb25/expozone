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
  return (
    <div className={fredoka.className}>
      <div>{children}</div>
    </div>
  );
}

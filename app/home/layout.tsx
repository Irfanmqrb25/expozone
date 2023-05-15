import ClientComponent from "@/components/ClientComponent";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/lib/session";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  return (
    <div>
      <ClientComponent>
        <Navbar session={session} />
      </ClientComponent>
      <div>{children}</div>
    </div>
  );
}

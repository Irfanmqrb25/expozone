import getCurrentUser from "@/lib/session";
import prisma from "@/lib/prisma";

export default async function getStore() {
  try {
    const session = await getCurrentUser();

    if (!session) {
      throw new Error("User session not found");
    }

    const stores = await prisma.store.findMany({
      where: {
        userId: session?.id,
      },
    });

    const store = stores.length > 0 ? stores[0] : null;

    return store;
  } catch (error) {
    console.log(error);
  }
}

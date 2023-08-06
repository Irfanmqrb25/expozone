import getProductById from "@/actions/getProductById";
import DetailProductPageClient from "./DetailProductPageClient";
import getCurrentUser from "@/lib/session";
import { notFound } from "next/navigation";

interface IProductParams {
  productId: string;
}

const DetailProductPage = async ({ params }: { params: IProductParams }) => {
  const product = await getProductById(params);
  const session = await getCurrentUser();

  if (!product) {
    notFound();
  }
  return <DetailProductPageClient product={product} session={session} />;
};

export default DetailProductPage;

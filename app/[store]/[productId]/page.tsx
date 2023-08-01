import getProductById from "@/actions/getProductById";
import DetailProductPageClient from "./DetailProductPageClient";
import getCurrentUser from "@/lib/session";

interface IProductParams {
  productId: string;
}

const DetailProductPage = async ({ params }: { params: IProductParams }) => {
  const product = await getProductById(params);
  const session = await getCurrentUser();
  return <DetailProductPageClient product={product} session={session} />;
};

export default DetailProductPage;

import ProductTable from "@/components/table/ProductTable";
import getProductByStore from "@/actions/getProductByStore";
import getStore from "@/actions/getStore";
import EmptyStore from "@/components/EmptyPage";

const ProductsPage = async () => {
  const productData = await getProductByStore();
  const store = await getStore();

  return (
    <div>
      <ProductTable store={store} productData={productData} />
    </div>
  );
};

export default ProductsPage;

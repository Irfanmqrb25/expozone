import getProductByStore from "@/app/actions/getProductByStore";
import Container from "@/components/Container";

const CategoryStorePage = async () => {
  const products = await getProductByStore();

  return (
    <Container>
      <div></div>
    </Container>
  );
};

export default CategoryStorePage;

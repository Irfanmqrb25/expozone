import Image from "next/image";
import { Patrick_Hand } from "next/font/google";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { CiBadgeDollar } from "react-icons/ci";
import clsx from "clsx";

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--patrick-hand",
});

interface ProductCard {
  storeName: string;
  storeImage: string | null;
  productName: string;
  productImage: string;
  price: number;
  onClick?: () => void;
}
const ProductCard: React.FC<ProductCard> = ({
  storeImage,
  storeName,
  productName,
  productImage,
  price,
  onClick,
}) => {
  const productNameSubstr =
    productName?.length > 30
      ? `${productName.substring(0, 30)}...`
      : productName;

  return (
    <div className="col-span-1 border border-gray-300 rounded-md cursor-pointer">
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden rounded-t-md aspect-square">
          <Image
            alt="product"
            src={productImage}
            fill
            className="object-cover w-full h-full transition hover:scale-110"
          />
        </div>
        <div className="flex flex-col gap-3 p-3 border border-y-gray-300">
          <p className="text-lg font-normal">{productNameSubstr}</p>
          <div className="flex items-center gap-2">
            <Avatar className="border border-gray-300 w-7 h-7">
              <AvatarImage
                src={storeImage || "/assets/blank-user.jpg"}
                alt="avatar"
              />
            </Avatar>
            <span>{storeName}</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-1">
            <CiBadgeDollar className="text-2xl" />
            <span className={clsx("text-lg", patrickHand.className)}>
              {price}
            </span>
          </div>
          <Button
            className={clsx("tracking-wider rounded-sm", patrickHand.className)}
            onClick={onClick}
          >
            Buy Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

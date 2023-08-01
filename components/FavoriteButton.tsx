import useFavorite from "@/hooks/useFavorites";
import { User } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface FavoriteButtonProps {
  productId: string;
  session?: User;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productId,
  session,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    productId,
    session,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative transition cursor-pointer hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default FavoriteButton;

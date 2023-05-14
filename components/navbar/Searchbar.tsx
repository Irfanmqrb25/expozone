import { IoSearchOutline } from "react-icons/io5";
import { Input } from "../ui/input";

const Searchbar = () => {
  return (
    <div className="flex items-center w-full px-4 py-1 border-2 rounded-md border-neutral-300">
      <IoSearchOutline className="text-xl" />
      <Input
        type="text"
        placeholder="Search product"
        className="w-5/6 border-none h-7 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Searchbar;

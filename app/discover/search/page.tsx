import getCurrentUser from "@/lib/session";
import SearchPageClient from "./client";

const SearchPage = async () => {
  const session = await getCurrentUser();
  return <SearchPageClient session={session} />;
};

export default SearchPage;

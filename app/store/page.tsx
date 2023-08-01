import EmptyStore from "@/components/EmptyPage";

import getStore from "@/actions/getStore";
import UpdateStoreForm from "./UpdateStoreForm";

const StorePage = async () => {
  const store = await getStore();

  if (!store)
    return (
      <div className="min-h-[80vh]">
        <EmptyStore />
      </div>
    );

  return <UpdateStoreForm store={store} />;
};

export default StorePage;

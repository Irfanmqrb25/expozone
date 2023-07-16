import { Info } from "lucide-react";
import { BiLink } from "react-icons/bi";

import getStore from "@/actions/getStore";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

const InformationStorePage = async () => {
  const store = await getStore();

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Info className="text-2xl" />
          <p className="text-2xl">Store Information</p>
        </div>
        <div className="flex flex-col gap-1 p-3 bg-gray-200 rounded-md md:w-[30%]">
          <p>
            <span className="font-medium">Store:</span> {store?.name}
          </p>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {store?.description}
          </p>
          <p>
            <span className="font-medium">Email:</span> {store?.email}
          </p>
          <p>
            <span className="font-medium">Address:</span> {store?.address},{" "}
            {store?.city}, {store?.country}
          </p>
          <Button className="flex items-center gap-1 mx-auto mt-4 ml-0 text-sm">
            <BiLink className="text-lg" />
            <span>contact us</span>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default InformationStorePage;

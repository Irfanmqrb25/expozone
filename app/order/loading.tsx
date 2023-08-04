import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

const OrdersPageLoading = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="w-[200px] h-8" />
      <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card
            className="h-full overflow-hidden border-2 border-black rounded-sm"
            key={i}
          >
            <CardHeader className="p-0 border-b-2 border-black">
              <AspectRatio ratio={4 / 3}>
                <Skeleton className="w-full h-full" />
              </AspectRatio>
            </CardHeader>
            <CardFooter className="p-4">
              <div className="flex flex-row items-center w-full gap-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPageLoading;

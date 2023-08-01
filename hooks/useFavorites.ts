import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

interface IUseFavorite {
  productId: string;
  session?: User;
}

const useFavorite = ({ productId, session }: IUseFavorite) => {
  const router = useRouter();
  const { toast } = useToast();

  const hasFavorited = useMemo(() => {
    const list = session?.favoriteIds || [];

    return list.includes(productId);
  }, [session, productId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!session) {
        return router.push("/login");
      }

      try {
        let request;
        let toastMessage;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${productId}`);
          toastMessage = "Product has been removed from favorites";
        } else {
          request = () => axios.post(`/api/favorites/${productId}`);
          toastMessage = "Product added to favorites";
        }

        await request();
        router.refresh();
        toast({
          title: "Success✅",
          description: toastMessage,
        });
      } catch (error) {
        toast({
          title: "Failed❌",
          description: "Something went wrong",
        });
      }
    },
    [session, hasFavorited, productId, router, toast]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;

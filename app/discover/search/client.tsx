"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import EmptyMessage from "@/components/EmptyMessage";
import ProductCard from "@/components/card/ProductCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { User } from "@/types";

import axios from "axios";
import { PackageOpen, Search } from "lucide-react";

interface SearchPageProps {
  session: User;
}

const SearchPageClient = ({ session }: SearchPageProps) => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<any[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [confirmedHasNoResults, setConfirmedHasNoResults] = useState(false);

  const query = searchParams?.get("st");

  useEffect(() => {
    const getData = async () => {
      if (query === "") return setResults([]);
      setIsLoadingResults(true);
      setConfirmedHasNoResults(false);
      try {
        const response = await axios.get(`/api/product?st=${query}`);
        if (response.data.length === 0) {
          setConfirmedHasNoResults(true);
        }
        setResults(response.data);
      } catch (error) {
        return { error: "Something went wrong" };
      } finally {
        setIsLoadingResults(false);
      }
    };
    getData();
  }, [query]);

  if (confirmedHasNoResults) {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-2xl">
              <Search size={21} />
              <p>{`Searching for "${query}"`}</p>
            </div>
            <p className="text-muted-foreground">{`items matches (${results.length})`}</p>
          </div>
        </div>
        <EmptyMessage
          title="Products Not Found"
          description={`There are no products with name ${query}`}
          icon={PackageOpen}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-2xl">
          <Search size={21} />
          <p>{`Searching for "${query}"`}</p>
        </div>
        <p className="text-muted-foreground">{`items matches (${results.length})`}</p>
      </div>
      <div className="grid grid-cols-1 gap-5 mx-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-3 2xl:gap-5 xl:grid-cols-5">
        {isLoadingResults
          ? Array.from({ length: 10 }).map((_, i) => (
              <Card
                key={i}
                className="h-full overflow-hidden border-2 border-black rounded-sm shadow-card"
              >
                <CardHeader className="p-0 border-b-2 border-black">
                  <AspectRatio
                    ratio={4 / 3}
                    className="relative overflow-hidden"
                  >
                    <Skeleton className="w-full h-full" />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="grid gap-2.5 p-4 border-b-2 border-black">
                  <Skeleton className="w-full h-8" />
                  <Skeleton className="w-20 h-6" />
                  <div className="flex items-center gap-1">
                    <Avatar className="border-2 border-black w-7 h-7">
                      <Skeleton className="w-full h-full rounded-full" />
                    </Avatar>
                    <Skeleton className="w-full h-5" />
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <div className="flex flex-row items-center w-full gap-2">
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-8" />
                  </div>
                </CardFooter>
              </Card>
            ))
          : results?.map((product) => (
              <ProductCard
                session={session}
                key={product.id}
                productData={product}
              />
            ))}
      </div>
    </div>
  );
};

export default SearchPageClient;

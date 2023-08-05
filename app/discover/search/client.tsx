"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import EmptyMessage from "@/components/EmptyMessage";
import ProductCard from "@/components/card/ProductCard";

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
        {results?.map((product) => (
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

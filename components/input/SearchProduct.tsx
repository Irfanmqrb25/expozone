"use client";

import { useState } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SearchProduct = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/discover/search?st=${searchTerm}`);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        className="flex items-center justify-between w-fit md:w-[300px] gap-2 px-2 py-[5px] border-2 border-white rounded-sm"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <p className="text-sm text-muted-foreground">
          {searchTerm === "" ? "Search..." : searchTerm}
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-black opacity-100">
          <Search size={14} />
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-3">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch} className="flex items-center gap-1">
              <Search size={16} />
              Search
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchProduct;
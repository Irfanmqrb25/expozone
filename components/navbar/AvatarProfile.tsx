"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { LogOut, User, Store, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import useCreateStoreModal from "@/hooks/useCreateStoreModal";
import { User as UserType, Store as StoreType } from "@/types";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const AvatarProfile = ({
  session,
  store,
}: {
  session: UserType;
  store: StoreType;
}) => {
  const router = useRouter();
  const createStoreModal = useCreateStoreModal();
  const [isOpen, setOpen] = useState(false);

  const onCreateStoreModal = useCallback(() => {
    if (!session) {
      router.push("/login");
    } else if (!store) {
      if (innerWidth < 1024) {
        setOpen(!isOpen);
      }
      createStoreModal.onOpen();
    } else if (store) {
      router.push("/mystore");
    }
  }, [session, createStoreModal, router, store, isOpen]);

  return (
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={session?.image || "/assets/blank-user.jpg"}
                alt="image user"
                referrerPolicy="no-referrer"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 bg-white"
            side="bottom"
            align="end"
          >
            <DropdownMenuLabel className="flex flex-col">
              <p>{session?.name}</p>
              <p className="text-xs font-normal text-gray-400">
                {session?.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-neutral-100" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={onCreateStoreModal}
              >
                <Store className="w-4 h-4 mr-2" />
                <span>My Store</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-neutral-100" />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => router.push("/login")}
          variant="outline"
          className="hover:bg-[#006E7F] hover:text-white py-[6px] hidden lg:block"
        >
          Sign in
        </Button>
      )}
    </div>
  );
};

export default AvatarProfile;

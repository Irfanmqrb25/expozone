import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import getCurrentUser from "@/lib/session";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftCircle, Mail } from "lucide-react";
import Link from "next/link";

const ProfilePage = async () => {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  const date = session?.createdAt || new Date();
  const formattedDate = format(date, "MMM d, yyyy");

  return (
    <div className="space-y-5">
      <Link href="/featured" className="flex gap-1 items-center text-2xl">
        <ArrowLeftCircle size={25} />
        Back
      </Link>
      <Card className="w-full lg:w-1/2 border-2 border-black">
        <CardHeader className="space-y-1">
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            *Unable to update profile at this time
          </CardDescription>
        </CardHeader>
        <Separator className="mb-6 bg-black h-[1.5px]" />
        <CardContent className="flex flex-col gap-5 w-full">
          <div className="flex gap-5 items-center">
            <Avatar className="w-20 h-20 border-2 border-black">
              <AvatarImage
                src={session?.image || "/assets/blank-user.jpg"}
                alt="image user"
              />
            </Avatar>
            <div>
              <p className="font-medium md:text-2xl">{session?.name}</p>
              <p className="text-sm md:text-base text-muted-foreground">
                Joined since {formattedDate}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p>Email address</p>
              <Badge>Primary</Badge>
            </div>
            <div className="flex items-center border-2 border-black rounded-sm">
              <div className="border-r-2 border-black p-2">
                <Mail size={20} />
              </div>
              <p className="p-2 text-sm">{session.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

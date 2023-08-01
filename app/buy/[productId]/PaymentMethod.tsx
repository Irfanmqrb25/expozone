import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BsApple, BsPaypal } from "react-icons/bs";

export function PaymentMethod() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Select a payment method</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <Label
            htmlFor="card"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
          >
            <RadioGroupItem value="card" id="card" className="sr-only" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6 mb-3"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
            Card
          </Label>
          <Label
            htmlFor="paypal"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
          >
            <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
            <BsPaypal className="w-6 h-6 mb-3" />
            Paypal
          </Label>
          <Label
            htmlFor="apple"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
          >
            <RadioGroupItem value="apple" id="apple" className="sr-only" />
            <BsApple className="w-6 h-6 mb-3" />
            Apple
          </Label>
        </RadioGroup>
        <div className="grid gap-2">
          <Label htmlFor="number">{`Card number (don't take it seriously)`}</Label>
          <Input id="number" placeholder="123456789" />
        </div>
      </CardContent>
    </Card>
  );
}

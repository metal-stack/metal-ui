import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface InfoDrawerProps {
  id: string;
  title: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InfoDrawer({
  id,
  title,
  children,
  open,
  onOpenChange,
}: InfoDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {id}
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-1/2 min-w-fit">
        <SheetHeader className="gap-1">
          <SheetTitle className="text-lg font-semibold text-primary">
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {children}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

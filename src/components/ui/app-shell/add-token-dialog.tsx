import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/providers/AuthProvider";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";

const formSchema = zod.object({
  name: zod.string().min(1, "Name is required").max(64, "Name must be 64 characters or less"),
  token: zod.string().min(10, "Token must be at least 10 characters"),
});

type FormValues = zod.infer<typeof formSchema>;

export function AddTokenDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addToken = useAuth().addToken;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      token: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    addToken(values.name.trim(), values.token.trim(), apiUrl);
    form.reset();
    onOpenChange(false);
    toast.success("Token added", {
      description: `${values.name.trim()} has been added to your token library.`,
    });
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add API Token</DialogTitle>
          <DialogDescription>
            Paste a token you created via the CLI to add it to your token library.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. my-laptop" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Paste your token here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-md border bg-muted/50 p-3">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">API URL:</span> {apiUrl}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                <IconPlus className="mr-2 size-4" />
                Add token
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

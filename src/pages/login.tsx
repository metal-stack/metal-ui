"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoke } from "@tauri-apps/api/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "@/assets/metal-stack.png";
import { useAuth } from "@/providers/AuthProvider";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  contextName: z.string().optional(),
  apiUrl: z.url("Please enter a valid URL"),
});

export default function Login() {
  const auth = useAuth();

  const contexts = useMemo(() => {
    if (auth.status === "authenticated") return auth.contexts;
    if (auth.status === "unauthenticated") return auth.contexts ?? [];
    return [];
  }, [auth]);

  const selected = useMemo(() => {
    if (auth.status === "authenticated") return auth.currentContext;
    if (auth.status === "unauthenticated") return auth.currentContext;
    return undefined;
  }, [auth]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contextName: selected?.name ?? "",
      apiUrl: selected?.apiUrl ?? "http://v2.api.172.17.0.1.nip.io:8080",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    invoke("start_oauth_login", {
      apiUrl: values.apiUrl,
      provider: "openid-connect",
      contextName: values.contextName ?? undefined,
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sidebar">
      <Card className="w-full max-w-md p-8">
        <div className="mb-4 flex justify-center flex-col items-center">
          <img src={logo} alt="metal-stack" className="h-16 w-16 mb-4" />
          <h2 className=" text-2xl font-bold">Login</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Context Select */}
            <FormField
              control={form.control}
              name="contextName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Context</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(name) => {
                        field.onChange(name);
                        const ctx = contexts.find((c) => c.name === name);
                        if (ctx) {
                          auth.setCurrentContext(ctx);
                          form.setValue("apiUrl", ctx.apiUrl ?? "", {
                            shouldValidate: true,
                          });
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a context" />
                      </SelectTrigger>
                      <SelectContent>
                        {contexts.map((c) => (
                          <SelectItem key={c.name} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select which context you want to authenticate against.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!!form.getValues("contextName")}
                      placeholder="https://v2.api.172.17.0.1.nip.io:8080"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the URL of your API server.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Connect
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

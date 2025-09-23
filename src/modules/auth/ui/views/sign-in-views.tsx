"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// ✅ Schema validation
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left Side (Form) */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8 space-y-6"
            >
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Login To Your Account</p>
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error alert */}
              {!!error && (
                <Alert className="bg-destructive/10 border-none">
                  <OctagonAlert className="h-4 w-4 text-destructive" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              {/* Sign In Button */}
              <Button disabled={pending} type="submit" className="w-full">
                {pending ? "Signing in..." : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center">
                <span className="flex-grow border-t border-border" />
                <span className="mx-2 text-sm text-muted-foreground">
                  Or continue with
                </span>
                <span className="flex-grow border-t border-border" />
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  disabled={pending}
                  variant="outline"
                  type="button"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() =>
                    authClient.signIn.social({ provider: "github" })
                  }
                >
                  <FaGithub /> GitHub
                </Button>
                <Button
                  disabled={pending}
                  variant="outline"
                  type="button"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() =>
                    authClient.signIn.social({ provider: "google" })
                  }
                >
                  <FaGoogle /> Google
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="underline underline-offset-4"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>

          {/* Right Side (Branding) */}
          <div className="bg-gradient-to-br from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="logo" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-white">Meet.AI</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

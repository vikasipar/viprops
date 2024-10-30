import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TbFaceIdError } from "react-icons/tb";
import Oauth from "@/components/layout/Oauth";

// Define form schema
const SignupSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

// Infer the type from the schema
type SignupFormData = z.infer<typeof SignupSchema>;

export default function Signup() {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const serverResponse = await res.json();
      console.log("Response: " + serverResponse.success);

      if (serverResponse.success === false) {
        setError(serverResponse.message);
        toast("Sign Up Failed!");
      } else {
        toast(serverResponse);
        navigate("/login");
      }
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto min-h-dvh flex flex-col items-center justify-center bg-stone-100">
      <div className="border border-stone-200 rounded-md shadow-lg w-[90%] md:w-[50%] lg:w-[38%] px-8 md:px-14 py-6 md:py-12 bg-stone-50">
        <h1 className="w-full text-center mb-9 text-lg md:text-2xl font-bold">
          Sign Up
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-9">
              {loading ? "Signing Up..." : "Sign up"}
            </Button>
          </form>
        </Form>
        <Oauth />
        <p className="mt-8 text-sm text-stone-500">
          Already have an account? <Link to="/auth/login">login</Link>.
        </p>
        {error && (
          <p className="w-full text-red-500 font-medium mt-2 space-x-2">
            <TbFaceIdError className="text-3xl inline-block" />{" "}
            <span>{error}</span>
          </p>
        )}
      </div>
    </div>
  );
}

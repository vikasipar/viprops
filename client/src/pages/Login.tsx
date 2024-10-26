import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/redux/user/userSlice";
import { TbFaceIdError } from "react-icons/tb";

// Define form schema
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

// Infer the type from the schema
type LoginFormData = z.infer<typeof LoginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state:any) => state.user);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const serverResponse = await res.json();

      if (serverResponse.success === false) {
        dispatch(loginFailure(serverResponse.message));
        toast.error("Login Failed!");
      } else {
        dispatch(loginSuccess(serverResponse));
        toast.success("Login Successful!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="w-full mx-auto min-h-screen flex flex-col items-center justify-center bg-stone-100">
      <div className="border border-stone-200 rounded-md shadow-lg w-[90%] md:w-[50%] lg:w-[38%] px-8 md:px-14 py-6 md:py-12 bg-stone-50">
        <h1 className="w-full text-left mb-9 text-lg md:text-2xl font-bold">
          Sign In
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            <Button type="submit" className="w-full uppercase" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        </Form>
        
        <p className="mt-8 text-sm text-stone-500">
          Don’t have an account?{" "}
          <Link to="/auth/signup" className="text-blue-500">
            Sign up
          </Link>.
        </p>
        {error && <p className="text-red-500 font-medium mt-2 space-x-2"><TbFaceIdError className="text-3xl inline-block" />  <span>{error}</span></p>}
      </div>
    </div>
  );
}

"use client";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "../../actions/login";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

function LoginPage() {
  const methods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const[isPending, setPending]=useState(false);
  const route=useRouter();

  const onSubmit = async (data) => {
    setPending(true);
    try {
      const result = await login(data);
      setPending(false);
        toast.success("Login successfully!");
        methods.reset();
        route.push("/profile");
    
    } catch (error) {
      setPending(false);
      toast.error("There was an error. Try again!");
      console.log(error);
    }
  };



  return (
    <FormProvider {...methods}>
      <Card className="w-[350px] rounded-lg shadow">
        <CardHeader>
          <CardTitle className="text-center">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField control={methods.control} name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Email:</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Your email..." disabled={isPending}/>
                    </FormControl>
                    <FormMessage>{methods.formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              ></FormField>

              <FormField control={methods.control} name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Password:</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Your password..." disabled={isPending}/>
                    </FormControl>
                    <FormMessage>{methods.formState.errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <Button type="submit" className="w-full text-lg">
              {isPending? "Pending..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p>Don't have an account?</p>
          <Button asChild variant="link" className="text-md">
            <Link href="/auth/register">Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}

export default LoginPage;

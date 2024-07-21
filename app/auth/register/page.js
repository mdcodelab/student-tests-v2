"use client";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "../../actions/register";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

export const RegisterSchema = z.object({
  name: z.string().min(1, {message: "Please provide name."}),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be 6 characters long." }),
});

function RegisterPage() {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const[isPending, setPending]=useState(false);
  const route=useRouter();
  const[error, setError]=useState("");
  const[success, setSuccess]=useState("");


const onSubmit = async (value) => {
    setPending(true);
    const data = await register(value);
    setPending(false);
    console.log(data);

    if (data.error) {
      setError(data.error);
      setSuccess("");
    } else {
      setSuccess(data.success);
      setError("");
      form.reset();
      route.push("/profile");
    }
  };

  return (
    <>
      <Card className="w-[350px] rounded-lg shadow">
        <CardHeader>
          <CardTitle className="text-center">Welcome!</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField control={form.control} name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name:</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter your name..." {...field} value={field.value || ""} disabled={isPending}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email:</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email..." {...field} value={field.value || ""} disabled={isPending}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password:</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter password..." {...field} value={field.value || ""} disabled={isPending}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error}></FormError>
              <FormSuccess message={success}></FormSuccess>
              <Button type="submit" className="w-full text-lg">
                {isPending ? "Pending..." : "Create an account"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p>Already have an account?</p>
          <Button asChild variant="link" className="text-md">
            <Link href="/auth/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default RegisterPage;

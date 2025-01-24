"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import { Lock, Mail, Tractor, ShoppingCart, BadgeIcon as IdCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Customer from '@/public/customer.webp'
import Kisan from '@/public/kisan.webp'
import axios, { AxiosError } from "axios"
import {useToast} from '@/hooks/use-toast'


const LogInSchema = z.object({
  email: z.string().trim().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().trim().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  accountType: z.enum(["farmer", "customer"], {
    required_error: "Please select an account type.",
  }),
  pmkisanId: z
    .string()
    .optional()
    .refine(
        (val) => {
          if (val === undefined) return true
          return val.length === 12
        },
        {
          message: "PMKISAN ID must be 12 characters long.",
        },
      ),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {toast}=useToast()

  const form = useForm<z.infer<typeof LogInSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      password: "",
      accountType: "farmer",
      pmkisanId: "111111111111",
    },
  })

  const accountType = form.watch("accountType")

  async function onSubmit(values: z.infer<typeof LogInSchema>) {
    setIsLoading(true)
    try {
      console.log(values)
      const res=await axios.post('/api/auth/login',values,{
        headers:{
          "Content-Type":"application/json"
        }
      })
      localStorage.setItem("user",JSON.stringify(res.data.data))
      
      toast({
        title:"User Logged In successfully",
        variant:"default"
      })
      router.push("/dashboard")
    } catch (error) {
      console.log(error)
      if(error instanceof AxiosError){
        toast({
          title:error.response?.data.msg,
          variant:"destructive"
        })
      }

    }
    finally{
      
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <Image
            src={accountType==="farmer"?Kisan:Customer}
            alt="Farmer's Market Logo"
            width={100}
            height={100}
            className="mx-auto mb-4 object-contain rounded-full"
          />
          <CardTitle>Login</CardTitle>
          <CardDescription>Access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="farmer" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center">
                            <Tractor className="w-4 h-4 mr-1" />
                            Farmer
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="customer" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Customer
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
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
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your email" className="pl-8" {...field} />
                      </div>
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
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="Enter your password" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {accountType === "farmer" && (
                <FormField
                  control={form.control}
                  name="pmkisanId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PMKISAN ID</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IdCard className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter your 12-digit PMKISAN ID" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Required for farmer accounts</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {"Don't"} have an account?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}


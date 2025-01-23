"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import { User, Lock, Mail, Tractor, ShoppingCart, BadgeIcon as IdCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Kisan from '@/public/kisan.webp'
import Customer from '@/public/customer.webp'
import axios, { AxiosError } from 'axios'
import {useToast} from '@/hooks/use-toast'

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "नाव किमान २ अक्षरे असावे.",
    }),
    email: z.string().email({
      message: "कृपया वैध ईमेल पत्ता प्रविष्ट करा.",
    }),
    password: z.string().min(8, {
      message: "पासवर्ड किमान ८ अक्षरे असावा.",
    }),
    confirmPassword: z.string(),
    accountType: z.enum(["farmer", "customer"], {
      required_error: "कृपया खात्याचा प्रकार निवडा.",
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
          message: "पीएमकिसान आयडी १२ अंकी असावा.",
        },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "पासवर्ड जुळत नाही",
    path: ["confirmPassword"],
  })

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {toast}=useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "farmer",
      pmkisanId: "111111111111",
    },
  })

  const accountType = form.watch("accountType")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      console.log(values)
      const res=await axios.post('/api/auth/signup',values,{
        headers:{
          "Content-Type":"application/json"
        }
      })

      console.log(res)
      toast({
        title:"वापरकर्ता यशस्वीरित्या निर्माण केला",
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
            src={accountType==='farmer'?Kisan:Customer}
            alt="Farmer's Market Logo"
            width={100}
            height={100}
            className="mx-auto mb-4 rounded-full object-contain"
            priority={true}
          />
          <CardTitle>नोंदणी करा</CardTitle>
          <CardDescription>तुमचे खाते तयार करा</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>खात्याचा प्रकार</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="farmer" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center">
                            <Tractor className="w-4 h-4 mr-1" />
                            शेतकरी
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="customer" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            ग्राहक
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>नाव</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="तुमचे नाव प्रविष्ट करा" className="pl-8" {...field} />
                      </div>
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
                    <FormLabel>ईमेल</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="तुमचा ईमेल प्रविष्ट करा" className="pl-8" {...field} />
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
                    <FormLabel>पासवर्ड</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="पासवर्ड तयार करा" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>पासवर्ड पुष्टी करा</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="पासवर्ड पुष्टी करा" className="pl-8" {...field} />
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
                      <FormLabel>पीएमकिसान आयडी</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IdCard className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="तुमचा १२-अंकी पीएमकिसान आयडी प्रविष्ट करा" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>शेतकरी खात्यांसाठी आवश्यक</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "नोंदणी करत आहे..." : "नोंदणी करा"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            आधीपासून खाते आहे?{" "}
            <a href="/mrt/login" className="text-primary hover:underline">
              लॉगिन करा
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
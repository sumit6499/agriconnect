"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Package, IndianRupee, Scale, Calendar, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { marketplaceSchema as formSchema } from '@/schema/marketplace.schema'
import { getImageURL } from "@/actions/actions"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"

export default function ListProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      category: "",
      price: 0,
      quantity: 0,
      unit: "",
      harvestDate: "",
      imageUrl: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await axios.post('/api/marketplace', values);
    toast({
      title: "यशस्वी",
      description: "नवीन उत्पादन यशस्वीरित्या जोडले गेले",
    });
    setIsLoading(false);
    router.push('/marketplace');
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>नवीन उत्पादन सूचीबद्ध करा</CardTitle>
          <CardDescription>आपले उत्पादन बाजारपेठेत जोडा</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>उत्पादनाचे नाव</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Package className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="उत्पादनाचे नाव प्रविष्ट करा" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>वर्णन</FormLabel>
                    <FormControl>
                      <Textarea placeholder="आपल्या उत्पादनाचे वर्णन करा" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>श्रेणी</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="श्रेणी निवडा" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fruits">फळे</SelectItem>
                        <SelectItem value="vegetables">भाज्या</SelectItem>
                        <SelectItem value="grains">धान्य</SelectItem>
                        <SelectItem value="dairy">दुग्धजन्य उत्पादने</SelectItem>
                        <SelectItem value="other">इतर</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>किंमत (₹)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IndianRupee className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="pl-8"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>प्रमाण</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Scale className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="0"
                            className="pl-8"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>युनिट</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="युनिट निवडा" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kg">किलो (kg)</SelectItem>
                          <SelectItem value="g">ग्रॅम (g)</SelectItem>
                          <SelectItem value="l">लिटर (l)</SelectItem>
                          <SelectItem value="piece">तुकडा</SelectItem>
                          <SelectItem value="dozen">डझन</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="harvestDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>पिकवलेली तारीख</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="date" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>उत्पादन कधी काढले गेले आहे किंवा काढले जाणार आहे ते नमूद करा</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>उत्पादनाचा प्रतिमा URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <ImageIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="file"
                          className="pl-8"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const imageUrl = await getImageURL(file);
                              field.onChange(imageUrl?.url);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>आपल्या उत्पादनाचा प्रतिमा URL द्या</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    उत्पादन सूचीबद्ध होत आहे...
                  </>
                ) : (
                  "उत्पादन सूचीबद्ध करा"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

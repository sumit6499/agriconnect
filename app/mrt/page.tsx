import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, ShoppingBasket, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
          शेतकऱ्यांना थेट ग्राहकांशी जोडणे
          </h1>
          <p className="text-lg text-muted-foreground">
          अ‍ॅग्रीकनेक्ट शेतकऱ्यांना थेट बाजारपेठ उपलब्ध करून देते आणि त्याचबरोबर ग्राहकांना ताजे, स्थानिक पातळीवर मिळणारे उत्पादन वाजवी किमतीत उपलब्ध करून देते.
          </p>
          <div className="flex gap-4">
            <Link href="/marketplace">
              <Button size="lg">
              मार्केटप्लेस ब्राउझ करा
                <ShoppingBasket className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="lg">
              शेतकरी म्हणून सामील व्हा
                <Leaf className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <Image
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
            alt="Farmer in field"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">अ‍ॅग्रीकनेक्ट का निवडावे?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">थेट शेती प्रवेश</h3>
            <p className="text-muted-foreground">
            स्थानिक शेतकऱ्यांशी थेट संपर्क साधा आणि मध्यस्थांशिवाय ताजे उत्पादन मिळवा.
            </p>
          </Card>
          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">बाजार अंतर्दृष्टी</h3>
            <p className="text-muted-foreground">
            माहितीपूर्ण निर्णय घेण्यासाठी रिअल-टाइम किंमत अंदाज आणि बाजारातील ट्रेंड जाणून घ्या.
            </p>
          </Card>
          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBasket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">सुरक्षित व्यवहार</h3>
            <p className="text-muted-foreground">
            आमच्या सुरक्षित पेमेंट गेटवेसह सुरक्षित आणि पारदर्शक व्यवहारांचा आनंद घ्या.
            </p>
          </Card>
        </div>
      </section>

      {/* Market Trends Preview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">नवीनतम बाजार ट्रेंड</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">सर्वाधिक विक्री होणारी उत्पादने</h3>
            <div className="space-y-4">
              {["सेंद्रिय टोमॅटो", "ताजे गहू", "हिरवे वाटाणे"].map((item) => (
                <div key={item} className="flex justify-between items-center">
                  <span>{item}</span>
                  <span className="text-green-600">↑ 12%</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">किंमत अंदाज</h3>
            <div className="space-y-4">
              {["भात", "डाळी", "भाज्या"].map((item) => (
                <div key={item} className="flex justify-between items-center">
                  <span>{item}</span>
                  <span className="text-blue-600">स्थिर</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
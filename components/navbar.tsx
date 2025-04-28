"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookies } from "cookies-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [user, setUser] = useState<string | null>();
  const [language, setLanguage] = useState<"en" | "mr">("en"); // 'en' default
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "User Logout successfully",
    });
    setUser(null);
    const cookies = getCookies();
    console.log(cookies);
    deleteCookie("isAuthenticated", { path: "/" });
    router.push("/login");
  };

  const handleLanguageChange = (lang: "en" | "mr") => {
    setLanguage(lang);
    const currentPath = window.location.pathname;
  
    // Remove "/mrt" prefix properly
    const cleanedPath = currentPath.startsWith("/mrt")
      ? currentPath.slice(4) || "/"  // remove exactly 4 characters (/mrt)
      : currentPath;
  
    if (lang === "mr") {
      router.push(`/mrt${cleanedPath}`);
    } else {
      router.push(cleanedPath);
    }
  
    toast({
      title: `Language changed to ${lang === "en" ? "English" : "Marathi"}`,
    });
  };
  
  
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6" />
            <span className="font-bold">{language==="mr"?"अ‍ॅग्रीकनेक्ट":"AgriConnect"}</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={language==="mr"?"/mrt/marketplace":"/marketplace"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {language==="mr"?"बाजारपेठ":"Marketplace"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={language==="mr"?"/mrt/dashboard":"/dashboard"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {language==="mr"?"डॅशबोर्ड":"Dashboard"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={language==="mr"?"/mrt/marketplace/list-product":"/marketplace/list-product"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {language==="mr"?"बाजारपेठेत उत्पादन जोडा":"Add Product to marketplace"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{language === "en" ? "English" : "मराठी"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("mr")}>
                मराठी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
          {!user ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">{language==="mr"?"लॉगिन करा":"Login"}</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">{language==="mr"?"नोंदणी करा":"Register"}</Link>
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleLogout}>
              {language==="mr"?"बाहेर पडा":"Logout"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

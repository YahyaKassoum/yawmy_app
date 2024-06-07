import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Layout } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import "./sdkStyle/style.css"
import "../app/react-datepicker/dist/react-datepicker.css"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "yowmy app ",
  description: "Video Calling app",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        
      <ClerkProvider
      appearance={
        
        {
          layout:{
           logoImageUrl:"/icons/logo.svg",
           socialButtonsVariant:"iconButton",
           
           
          },
          variables:{
          colorText:"#fff",
          colorPrimary:"#0E78F9",
          colorBackground:'#1C1F2E',
          colorInputBackground:'#252a41',
          colorInputText:"#fff",
          colorShimmer:"#FFF",
          colorDanger:"#FFF",
          colorNeutral:"#fff",
          
          
        }}
      }>
        <body className={`${inter.className} bg-dark-2`}>
        {children}
        <Toaster/>
        </body>
      </ClerkProvider>
    
    </html>
  );
}

import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-10">
          <h1 className="font-bold text-3xl text-[#2e2a47]">Welcome Back!</h1>
          <p className="text-base text-[#7e8ca0]">
            Login or Create Account to get back to your dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-4">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" alt="logo" height={100} width={100} />
      </div>
    </div>
  );
}

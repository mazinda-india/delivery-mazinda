"use client";

import Link from "next/link";
import MazindaLogo from "@/public/logo_mazinda.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
// // import Cookies from "js-cookie"
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();
  //   const router = useRouter();

  return (
    <>
      {!pathname.includes("auth") && (
        <nav className="bg-white border-gray-200 py-2">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              href={pathname.includes("admin") ? "/admin" : "store"}
              className="flex items-center"
            >
              <Image
                // width={120}
                height={30}
                src={MazindaLogo}
                className="h-8 mr-3 aspect-video object-contain"
                alt="Mazinda Logo"
              />
            </Link>
            {/* <Button
              variant="destructive"
              onClick={() => {
                Cookies.remove("store_token");
                router.push("/auth/login");
              }}
            >
              Logout
            </Button> */}
          </div>

          {/* <div className="text-center">
            <span>Welcome, {storeName?.toUpperCase()}</span>
          </div> */}
        </nav>
      )}
    </>
  );
};

export default Navbar;

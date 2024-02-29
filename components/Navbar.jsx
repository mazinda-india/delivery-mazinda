import Link from "next/link";
import MazindaLogo from "@/public/logo_mazinda.png";
import Image from "next/image";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const Navbar = () => {
  const token = cookies().get("access_token");
  let decoded;
  try {
    decoded = jwt.verify(token.value, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
  }
  return (
    <nav className="bg-white border-gray-200 py-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={"/"} className="flex items-center">
          <Image
            // width={120}
            height={30}
            src={MazindaLogo}
            className="h-8 mr-3 aspect-video object-contain"
            alt="Mazinda Logo"
          />
        </Link>
      </div>

      <div className="text-center">
        {decoded && <span>Welcome, {decoded?.name} !</span>}{" "}
      </div>
    </nav>
  );
};

export default Navbar;

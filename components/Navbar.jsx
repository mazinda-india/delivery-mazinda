import Link from "next/link";
import MazindaLogo from "@/public/logo_mazinda.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 py-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={"/"} className="flex items-center">
          <Image
            height={30}
            src={MazindaLogo}
            className="h-8 mr-3 aspect-video object-contain"
            alt="Mazinda Logo"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

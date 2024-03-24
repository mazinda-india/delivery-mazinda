import Link from "next/link";
import MazindaLogo from "@/public/logo_mazinda.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 py-4 px-3 md:px-6 border-b">
      <Link href={"/"} className="flex items-center">
        <Image
          height={30}
          src={MazindaLogo}
          className="h-8 mr-3 aspect-video object-contain"
          alt="Mazinda Logo"
        />
      </Link>
    </nav>
  );
};

export default Navbar;

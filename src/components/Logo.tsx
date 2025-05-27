import Image from "next/image";
import Link from "next/link";

import logo from "../assets/images/logo.webp";

export function Logo() {
  return (
    <Link
      href="/"
      className="mb-2 flex h-20 items-center justify-center rounded-md bg-black"
    >
      <Image
        src={logo}
        alt="Logo"
        width={200}
        height={80}
        priority
        className="h-auto"
      />
    </Link>
  );
}

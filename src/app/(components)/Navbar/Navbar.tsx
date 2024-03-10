import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/carts";
import ShoppingCartButton from "./ShoppingCartButton";

import { getServerSession } from "next-auth";
import UserMenuButton from "./UserMenuButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";

const searchProduct = async (formData: FormData) => {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
};

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1 ">
          <Link className="btn btn-ghost text-xl normal-case" href="/">
            <Image
              src={logo}
              height={40}
              width={40}
              alt="copyzon logo"
              priority
            />
            Copyzon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProduct}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

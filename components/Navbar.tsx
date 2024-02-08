import Link from "next/link";
import Image from "next/image";
import { signOut, auth } from "@/auth";
import { Button } from "@/components/ui/button";

export const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex  justify-between items-center flex-between bg-sky-300 h-20 w-full px-4">
      <Link href="/" className="flex gap-2 flex-center">
        {/* <Image
          src="/next.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        /> */}
        <p className="logo_text"> PRINT & CUT</p>
      </Link>
      <div className="flex gap-x-4">
        {!session?.user && (
          <Link href="/auth/login">
            <Button>Sign in</Button>
          </Link>
        )}
        {session?.user ? (
          <>
            <form
              action={async () => {
                "use server";

                await signOut();
              }}
            >
              <Button type="submit">Sign out</Button>
            </form>
            {/* <Image
              src={session?.user.image!}
              width={37}
              height={37}
              alt="Profile"
              className=" bg-white rounded-full"
            /> */}
          </>
        ) : null}
      </div>
    </nav>
  );
};

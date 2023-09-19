"use client"

import Image from "next/image"
import { redirect } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="overflow-y-auto bg-gray-800 px-4 pb-20 pt-4 sm:p-0">
        <div className="flex min-h-screen items-end justify-center text-center sm:block">
          <div className="bg-gray-500/75 transition-opacity"></div>
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
            ​
          </span>
          <div className="inline-block overflow-hidden rounded-lg bg-gray-900 text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:align-middle">
            <div className="relative mx-auto w-full max-w-7xl items-center md:px-12 lg:px-24">
              <div className="grid grid-cols-1">
                <div className="mx-auto my-4 max-w-lg bg-gray-900">
                  <div className="flex flex-col items-center p-6">
                    <Image
                      alt="avatar"
                      src="/images/avatar.jpg"
                      height={50}
                      width={50}
                      className="btn- mx-auto -mb-8 flex h-16 w-16 shrink-0 rounded-full object-cover object-center shadow-xl"
                    />
                    <p className="mt-8 text-2xl font-semibold leading-none tracking-tighter text-white lg:text-3xl">
                      Welcome {session?.user?.name}
                    </p>

                    <div className="mt-6 w-full">
                      <button
                        onClick={() => signOut()}
                        className="flex w-full items-center justify-center rounded-xl bg-green-600 px-10 py-4 text-center text-base font-medium text-white transition duration-500 ease-in-out hover:bg-green-700 focus:outline-none focus:ring-2  focus:ring-green-500 focus:ring-offset-2"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect("/login")
  }
}

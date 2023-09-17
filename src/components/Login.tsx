"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

import { signInSchema, TSignInSchema } from "@/lib/types"

import { Button } from "./ui/Button"

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard")
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: TSignInSchema) => {
    setIsLoading(true)
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success("Logged in")
        router.push("/dashboard")
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 grid grid-cols-6 space-y-4"
    >
      <div className="col-span-6">
        <label className="mb-2 block text-xs font-semibold">Email</label>
        <input
          {...register("email")}
          type="email"
          disabled={isLoading}
          autoComplete="email"
          placeholder="Email"
          className="block w-full rounded-md border border-gray-300 p-2 text-gray-500 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
      </div>

      <div className="col-span-6">
        <label className="mb-2 block text-xs font-semibold">Password</label>
        <input
          {...register("password")}
          type="password"
          disabled={isLoading}
          autoComplete="current-password"
          placeholder="Password"
          className="block w-full rounded-md border border-gray-300 p-2 text-gray-500 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
      </div>

      <div className="col-span-6 flex flex-wrap content-center justify-between">
        <input
          id="remember"
          type="checkbox"
          className="mr-1 checked:bg-green-700"
        />{" "}
        <span className="mr-auto text-xs font-semibold">
          Remember for 30 days
        </span>
        <Link href="#" className="text-xs font-semibold text-green-700">
          Forgot password?
        </Link>
      </div>

      <div className="w-full justify-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mb-4 block rounded-md bg-green-700 p-2 text-center text-white hover:bg-green-900 disabled:bg-gray-500"
        >
          {" "}
          Login
        </Button>
      </div>
    </form>
  )
}

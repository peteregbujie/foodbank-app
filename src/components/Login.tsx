"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <input
        {...register("email")}
        type="email"
        disabled={isLoading}
        autoComplete="email"
        placeholder="Email"
        className="rounded px-4 py-2"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input
        {...register("password")}
        type="password"
        disabled={isLoading}
        autoComplete="current-password"
        placeholder="Password"
        className="rounded px-4 py-2"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full disabled:bg-gray-500"
      >
        {" "}
        Login
      </Button>
    </form>
  )
}

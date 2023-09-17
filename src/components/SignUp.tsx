"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

import { signUpSchema, TSignUpSchema } from "@/lib/types"

import { Button } from "./ui/Button"

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: TSignUpSchema) => {
    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const response = await fetch("/api/signup", config)
      if (response.status === 200) {
        router.push("/dashboard")
        toast.success("Thank you for signing up")

        // Reset the form after successful submission
        reset()
      }
    } catch (err: any) {
      toast.error(err.response.data.message + ": " + err.response.statusText)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 grid grid-cols-6 gap-6"
    >
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="FirstName"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>

        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-sm"
        />
        {errors.name && (
          <p className="text-red-500">{`${errors.name.message}`}</p>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="LastName"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-sm"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="Email"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-sm"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="Password"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-sm"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
      </div>

      <div className="col-span-6">
        <label htmlFor="MarketingAccept" className="flex gap-4">
          <input
            type="checkbox"
            id="MarketingAccept"
            name="marketing_accept"
            className="h-5 w-5 rounded-md border border-gray-300 bg-white shadow-sm"
          />

          <span className="text-sm text-gray-700">
            I want to receive emails about events, updates and
          </span>
        </label>
      </div>

      <div className="col-span-6">
        <p className="text-sm text-gray-500">
          By creating an account, you agree to our
          <Link href="#" className="text-gray-700 underline">
            terms and conditions
          </Link>
          and
          <Link href="#" className="text-gray-700 underline">
            privacy policy
          </Link>
          .
        </p>
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:bg-gray-500"
        >
          {" "}
          Sign Up
        </Button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Already have an account?
          <Link href="/login" className="text-gray-700 underline">
            Log in
          </Link>
          .
        </p>
      </div>
    </form>
  )
}

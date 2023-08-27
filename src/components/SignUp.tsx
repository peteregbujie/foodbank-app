"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

import { signUpSchema, TSignUpSchema } from "@/lib/types"

import { Button } from "./ui/Button"

export default function Register() {
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
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const responseData = await response.json()
    if (!response.ok) {
      // response status is not 2xx
      toast.error("Submitting form failed!")
      return
    }

    if (responseData.errors) {
      const errors = responseData.errors

      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        })
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        })
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        })
      } else {
        toast.error("Something went wrong!")
      }
    }

    // reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="rounded px-4 py-2"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="rounded px-4 py-2"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm password"
        className="rounded px-4 py-2"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full disabled:bg-gray-500"
      >
        {" "}
        Sign Up
      </Button>
    </form>
  )
}

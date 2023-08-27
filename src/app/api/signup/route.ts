import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import { prisma } from "@/lib/prisma"
import { signUpSchema } from "@/lib/types"

export async function POST(request: Request) {
  const body = await request.json()

  const result = signUpSchema.safeParse(body)
  let zodErrors = {}
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })
  }

  const { name, email, password } = body

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (exist) {
    throw new Error("Email already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  })

  return NextResponse.json(
    Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : user
  )
}

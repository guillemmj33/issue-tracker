import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { issueSchema } from "../../validationSchemas"
import authOptions from "../auth/authOptions"
import { getServerSession } from "next-auth"

export async function GET() {
  const issues = await prisma.issue.findMany()

  return NextResponse.json(issues)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
  const body = await request.json()
  const validation = issueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  try {
    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description },
    })

    return NextResponse.json(newIssue, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

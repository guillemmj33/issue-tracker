import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { createIssueSchema } from "../../validationSchemas"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = createIssueSchema.safeParse(body)
  const prisma = new PrismaClient()

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
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

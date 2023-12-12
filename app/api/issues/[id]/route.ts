import { issueSchema } from "@/app/validationSchemas"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"
import authOptions from "../../auth/authOptions"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  })
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 })

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  })

  return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
  const issue = prisma.issue.findUnique({
    where: { id: params.id },
  })

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 })

  await prisma.issue.delete({ where: { id: params.id } })

  return NextResponse.json({ message: "Issue deleted" }, { status: 200 })
}

import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  if(params.id.length !== 24) {
    notFound()
  }
  
  const prisma = new PrismaClient()
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!issue) {
    notFound()
  }
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.getDate()}</p>
    </div>
  )
}

export default IssueDetailPage
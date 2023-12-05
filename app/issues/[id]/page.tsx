import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import { PrismaClient } from "@prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  if (params.id.length !== 24) {
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
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  )
}

export default IssueDetailPage

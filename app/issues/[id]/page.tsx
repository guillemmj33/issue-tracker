import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import { PrismaClient } from "@prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"


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
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  )
}

export default IssueDetailPage

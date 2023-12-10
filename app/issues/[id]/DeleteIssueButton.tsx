"use client"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter()
  const handleDelete = async () => {
    await axios.delete(`/api/issues/${issueId}`)
    router.push("/issues")
    router.refresh()
  }
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This will permanently delete this issue.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={handleDelete}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton
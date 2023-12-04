import { Button } from "@radix-ui/themes"
import Link from "next/link"
const IssuesPage = () => {
  return (
    <div>
      <div>
        <Button className="cursor-pointer">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
    </div>
  )
}

export default IssuesPage

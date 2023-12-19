"use client"
import { Select } from "@radix-ui/themes"

const ASsigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Mosh</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default ASsigneeSelect
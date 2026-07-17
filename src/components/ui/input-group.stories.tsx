import type { Meta, StoryObj } from '@storybook/react-vite'
import { MailIcon, SearchIcon } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
}

export const WithButton: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon>
        <MailIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Email" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Subscribe</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithText: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
}

export const Textarea: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupTextarea placeholder="Type your message..." />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="sm">Send</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

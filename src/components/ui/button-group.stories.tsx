import type { Meta, StoryObj } from '@storybook/react-vite'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <BoldIcon />
      </Button>
      <Button variant="outline">
        <ItalicIcon />
      </Button>
      <Button variant="outline">
        <UnderlineIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
}

export const WithTextAndSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>https://</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant="outline">example.com</Button>
    </ButtonGroup>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { FolderOpenIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

const meta = {
  title: 'Components/Empty',
  component: Empty,
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty className="w-96 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create project</Button>
      </EmptyContent>
    </Empty>
  ),
}

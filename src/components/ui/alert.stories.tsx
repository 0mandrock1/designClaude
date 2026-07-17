import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckCircle2Icon, AlertCircleIcon } from 'lucide-react'

import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/Alert',
  component: Alert,
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <CheckCircle2Icon />
      <AlertTitle>Success! Your changes have been saved</AlertTitle>
      <AlertDescription>
        This is an alert with icon, title and description.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircleIcon />
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>
        Please verify your billing information and try again.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <CheckCircle2Icon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>A new version is ready to install.</AlertDescription>
      <AlertAction>
        <Button size="sm">Update</Button>
      </AlertAction>
    </Alert>
  ),
}

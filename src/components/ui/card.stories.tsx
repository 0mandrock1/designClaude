import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const meta = {
  title: 'Components/Card',
  component: Card,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Skip
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to get started with your new project.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-72">
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Uses the smaller spacing variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Less padding overall.</p>
      </CardContent>
    </Card>
  ),
}

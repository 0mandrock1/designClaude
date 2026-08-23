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
    <Card className="w-80" id="create-project">
      <CardHeader>
        <CardTitle>Новий проєкт</CardTitle>
        <CardDescription>Задеплой в один клік, без драми.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Пропустити
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Заповни поля нижче — і воно поїхало.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Відміна</Button>
        <Button>Задеплоїти</Button>
      </CardFooter>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-72" id="compact">
      <CardHeader>
        <CardTitle>Компактна картка</CardTitle>
        <CardDescription>Менше відступів, той самий характер.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Щільніше, без повітря.</p>
      </CardContent>
    </Card>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <Card className="relative w-80" id="live-process" debris>
      <CardHeader>
        <CardTitle>Процес живий</CardTitle>
        <CardDescription>Осад — випадковий, необов'язковий.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Гліфи й мікротекст збиті з сітки. Картка — ні.
        </p>
      </CardContent>
    </Card>
  ),
}

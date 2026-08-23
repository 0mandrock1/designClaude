import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  TriangleAlertIcon,
} from 'lucide-react'

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
      <TriangleAlertIcon />
      <AlertTitle>Перевір конфіг перед деплоєм</AlertTitle>
      <AlertDescription>
        Це alert з icon, title і description — базовий variant.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircleIcon />
      <AlertTitle>Payment не пройшов</AlertTitle>
      <AlertDescription>
        Перевір billing-дані і спробуй ще раз.
      </AlertDescription>
    </Alert>
  ),
}

export const Info: Story = {
  render: () => (
    <Alert variant="info" className="w-96">
      <InfoIcon />
      <AlertTitle>Нова версія API вже деплоїться</AlertTitle>
      <AlertDescription>
        Rollout йде поетапно, downtime не очікується.
      </AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-96">
      <CheckCircle2Icon />
      <AlertTitle>Задеплоєно</AlertTitle>
      <AlertDescription>
        Всі checks зелені, build пройшов без warnings.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <CheckCircle2Icon />
      <AlertTitle>Доступне оновлення</AlertTitle>
      <AlertDescription>Нова версія готова до встановлення.</AlertDescription>
      <AlertAction>
        <Button size="sm">Оновити</Button>
      </AlertAction>
    </Alert>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <Alert variant="info" className="w-96" id="live-rollout" debris>
      <InfoIcon />
      <AlertTitle>Rollout триває прямо зараз</AlertTitle>
      <AlertDescription>
        Осад — гліфи й мікротекст, збиті з сітки навколо самого alert.
      </AlertDescription>
    </Alert>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList className="w-full">
        <TabsTrigger value="overview">Огляд</TabsTrigger>
        <TabsTrigger value="settings">Налаштування</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">
          Стан системи, коротко.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">
          Тут керуєш конфігом.
        </p>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvas, userEvent }) => {
    const overviewTab = canvas.getByRole('tab', { name: /огляд/i })
    const settingsTab = canvas.getByRole('tab', { name: /налаштування/i })
    await expect(overviewTab).toHaveAttribute('aria-selected', 'true')
    await expect(settingsTab).toHaveAttribute('aria-selected', 'false')
    await userEvent.click(settingsTab)
    await expect(settingsTab).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByText('Тут керуєш конфігом.')).toBeVisible()
  },
}

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList variant="line" className="w-full">
        <TabsTrigger value="overview">Огляд</TabsTrigger>
        <TabsTrigger value="activity">Активність</TabsTrigger>
        <TabsTrigger value="settings">Налаштування</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">Загальний стан.</p>
      </TabsContent>
      <TabsContent value="activity">
        <p className="text-sm text-muted-foreground">Лог подій, живий.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">Параметри деплою.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Огляд</TabsTrigger>
        <TabsTrigger value="activity">Активність</TabsTrigger>
        <TabsTrigger value="settings">Налаштування</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">Загальний стан системи.</p>
      </TabsContent>
      <TabsContent value="activity">
        <p className="text-sm text-muted-foreground">Останні події, без фільтру.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">Все, що можна зламати.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList className="w-full">
        <TabsTrigger value="overview">Огляд</TabsTrigger>
        <TabsTrigger value="activity">Активність</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" debris className="min-h-24 p-2">
        <p className="text-sm text-muted-foreground">
          Панель живе своїм життям, поки процес не завершився.
        </p>
      </TabsContent>
      <TabsContent value="activity" debris className="min-h-24 p-2">
        <p className="text-sm text-muted-foreground">
          Осад — по осередку кожної вкладки, детермінований на value.
        </p>
      </TabsContent>
    </Tabs>
  ),
}

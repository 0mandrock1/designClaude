import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion defaultValue={['item-1']} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Це accessible?</AccordionTrigger>
        <AccordionContent>
          Так. WAI-ARIA паттерн дотримано.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Це стилізовано?</AccordionTrigger>
        <AccordionContent>
          Так. Дефолтні стилі узгоджені з рештою компонентів.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Це анімовано?</AccordionTrigger>
        <AccordionContent>
          Так, за замовчуванням. Можна вимкнути.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvas, userEvent }) => {
    const first = canvas.getByRole('button', { name: /це accessible/i })
    const second = canvas.getByRole('button', { name: /це стилізовано/i })
    await expect(first).toHaveAttribute('aria-expanded', 'true')
    await expect(second).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(second)
    await expect(second).toHaveAttribute('aria-expanded', 'true')
  },
}

export const Multiple: Story = {
  render: () => (
    <Accordion defaultValue={['item-1', 'item-2']} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Перший пункт</AccordionTrigger>
        <AccordionContent>Обидва можуть бути відкриті одночасно.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Другий пункт</AccordionTrigger>
        <AccordionContent>Бо обидва в defaultValue.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <Accordion defaultValue={['log-1']} className="w-96">
      <AccordionItem debris value="log-1">
        <AccordionTrigger>JOB-0091</AccordionTrigger>
        <AccordionContent>render-farm-03, done, 412s.</AccordionContent>
      </AccordionItem>
      <AccordionItem debris value="log-2">
        <AccordionTrigger>JOB-0092</AccordionTrigger>
        <AccordionContent>render-farm-01, queued.</AccordionContent>
      </AccordionItem>
      <AccordionItem debris value="log-3">
        <AccordionTrigger>JOB-0093</AccordionTrigger>
        <AccordionContent>render-farm-02, live, 87s.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

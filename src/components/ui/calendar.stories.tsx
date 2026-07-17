import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-xl border"
      />
    )
  },
}

export const Range: Story = {
  render: () => {
    const [range, setRange] = React.useState<
      { from: Date | undefined; to?: Date | undefined } | undefined
    >({ from: new Date(), to: undefined })
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-xl border"
      />
    )
  },
}

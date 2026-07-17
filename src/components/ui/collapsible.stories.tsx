import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-80 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">@peduarte starred 3 repositories</span>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />}>
          <ChevronsUpDownIcon />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg border px-3 py-2 text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-lg border px-3 py-2 text-sm">@radix-ui/colors</div>
        <div className="rounded-lg border px-3 py-2 text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

export const Default: Story = {
  render: () => (
    <Combobox items={frameworks} itemToStringLabel={(item) => item.label}>
      <ComboboxInput placeholder="Select framework..." />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from '@/components/ui/native-select'

const meta = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NativeSelect className="w-56" defaultValue="next">
      <NativeSelectOption value="next">Next.js</NativeSelectOption>
      <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
      <NativeSelectOption value="nuxt">Nuxt.js</NativeSelectOption>
      <NativeSelectOption value="remix">Remix</NativeSelectOption>
    </NativeSelect>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <NativeSelect className="w-56" defaultValue="apple">
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="potato">Potato</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}

export const Small: Story = {
  render: () => (
    <NativeSelect className="w-56" size="sm" defaultValue="next">
      <NativeSelectOption value="next">Next.js</NativeSelectOption>
      <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
    </NativeSelect>
  ),
}

export const Disabled: Story = {
  render: () => (
    <NativeSelect className="w-56" defaultValue="next" disabled>
      <NativeSelectOption value="next">Next.js</NativeSelectOption>
    </NativeSelect>
  ),
}

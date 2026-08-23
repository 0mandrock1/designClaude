import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CalendarIcon,
  SmileIcon,
  CalculatorIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

const meta = {
  title: 'Components/Command',
  component: Command,
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Command className="w-96">
      <CommandInput placeholder="Введи команду або шукай..." />
      <CommandList>
        <CommandEmpty>Нічого не знайдено.</CommandEmpty>
        <CommandGroup heading="Швидкі дії">
          <CommandItem>
            <CalendarIcon />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <SmileIcon />
            <span>Пошук emoji</span>
          </CommandItem>
          <CommandItem>
            <CalculatorIcon />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Налаштування">
          <CommandItem>
            <UserIcon />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const WithDebris: Story = {
  render: () => (
    <Command debris className="w-96">
      <CommandInput placeholder="Введи команду або шукай..." />
      <CommandList>
        <CommandEmpty>Нічого не знайдено.</CommandEmpty>
        <CommandGroup heading="Швидкі дії">
          <CommandItem>
            <CalendarIcon />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <SmileIcon />
            <span>Пошук emoji</span>
          </CommandItem>
          <CommandItem>
            <CalculatorIcon />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Налаштування">
          <CommandItem>
            <UserIcon />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

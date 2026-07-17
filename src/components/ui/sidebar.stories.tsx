import type { Meta, StoryObj } from '@storybook/react-vite'
import { HomeIcon, InboxIcon, SettingsIcon } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { title: 'Home', icon: HomeIcon },
  { title: 'Inbox', icon: InboxIcon },
  { title: 'Settings', icon: SettingsIcon },
]

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <span className="px-2 text-sm font-semibold">Acme Inc</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton render={<a href="#" />}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <span className="px-2 text-xs text-muted-foreground">v1.0.0</span>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b p-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Dashboard</span>
        </div>
        <div className="p-4 text-sm text-muted-foreground">
          Main content area.
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

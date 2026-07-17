import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const meta = {
  title: 'Components/Field',
  component: Field,
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <FieldSet>
        <FieldLegend>Account details</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-email">Email</FieldLabel>
            <Input id="field-email" type="email" placeholder="you@example.com" />
            <FieldDescription>We'll never share your email.</FieldDescription>
          </Field>
          <Field data-invalid="true">
            <FieldLabel htmlFor="field-password">Password</FieldLabel>
            <Input id="field-password" type="password" />
            <FieldError errors={[{ message: 'Password must be at least 8 characters.' }]} />
          </Field>
          <FieldSeparator>or</FieldSeparator>
          <Field orientation="horizontal">
            <Checkbox id="field-checkbox" />
            <FieldContent>
              <FieldTitle>Remember me</FieldTitle>
              <FieldDescription>Stay signed in on this device.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
}

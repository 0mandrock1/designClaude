import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileTextIcon, XIcon } from 'lucide-react'

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment'

const meta = {
  title: 'Components/Attachment',
  component: Attachment,
} satisfies Meta<typeof Attachment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Attachment>
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>report.pdf</AttachmentTitle>
        <AttachmentDescription>1.2 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction>
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Attachment state="idle">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Drop file here</AttachmentTitle>
          <AttachmentDescription>Waiting for upload</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>uploading.zip</AttachmentTitle>
          <AttachmentDescription>Uploading…</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>failed.zip</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AttachmentGroup>
      <Attachment orientation="vertical" size="sm">
        <AttachmentMedia variant="image">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=200&dpr=2&q=80"
            alt="preview"
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>photo.png</AttachmentTitle>
          <AttachmentDescription>240 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment orientation="vertical" size="sm">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>doc.txt</AttachmentTitle>
          <AttachmentDescription>2 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  ),
}

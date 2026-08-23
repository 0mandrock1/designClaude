import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const meta = {
  title: 'Components/Table',
  component: Table,
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const jobs = [
  { id: 'JOB-0091', status: 'done', target: 'render-farm-03', duration: 412 },
  { id: 'JOB-0092', status: 'queued', target: 'render-farm-01', duration: 0 },
  { id: 'JOB-0093', status: 'live', target: 'render-farm-02', duration: 87 },
  { id: 'JOB-0094', status: 'error', target: 'render-farm-03', duration: 12 },
]

export const Default: Story = {
  render: () => (
    <Table className="w-[560px]">
      <TableCaption>Черга задач рендер-ферми.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-32">ID</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Target</TableHead>
          <TableHead className="text-right">Duration, s</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-mono">{job.id}</TableCell>
            <TableCell>{job.status}</TableCell>
            <TableCell className="font-mono">{job.target}</TableCell>
            <TableCell className="text-right font-mono tabular-nums">
              {job.duration}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right font-mono tabular-nums">511</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

export const SelectedRow: Story = {
  name: 'Виділений рядок (glow)',
  render: () => (
    <Table className="w-[560px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-32">ID</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Target</TableHead>
          <TableHead className="text-right">Duration, s</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id} data-state={job.id === 'JOB-0093' ? 'selected' : undefined}>
            <TableCell className="font-mono">{job.id}</TableCell>
            <TableCell>{job.status}</TableCell>
            <TableCell className="font-mono">{job.target}</TableCell>
            <TableCell className="text-right font-mono tabular-nums">
              {job.duration}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <Table debris id="jobs-table" className="w-[560px]">
      <TableCaption>Debris — фонові біти системного шуму.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-32">ID</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Target</TableHead>
          <TableHead className="text-right">Duration, s</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-mono">{job.id}</TableCell>
            <TableCell>{job.status}</TableCell>
            <TableCell className="font-mono">{job.target}</TableCell>
            <TableCell className="text-right font-mono tabular-nums">
              {job.duration}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

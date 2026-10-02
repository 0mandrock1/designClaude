import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  ArtistFeature,
  ArtistFeatureMeta,
  ArtistFeatureName,
  ArtistSlot,
  ArtistSlotBar,
  ArtistSlotGroup,
  ArtistSlotHint,
  ArtistSlotMeta,
  ArtistSlotName,
  ArtistsPanel,
  ArtistsPanelEyebrow,
  ArtistsPanelHeader,
  ArtistsPanelTitle,
  ArtistsSection,
  ArtistsSectionHeader,
  reservedSlots,
} from '@/components/ui/artist-slot'

const meta = {
  title: 'Components/ArtistSlot',
  component: ArtistSlot,
} satisfies Meta<typeof ArtistSlot>

export default meta
type Story = StoryObj<typeof meta>

/** All three states next to each other — the reason the component exists. */
export const Default: Story = {
  render: () => (
    <ArtistsPanel className="w-[44rem]">
      <ArtistSlotGroup>
        <ArtistSlot state="active" href="/music">
          <ArtistSlotName>mandrock0</ArtistSlotName>
          <ArtistSlotMeta>/music · електроніка</ArtistSlotMeta>
        </ArtistSlot>

        <ArtistSlot state="archive">
          <ArtistSlotName>exDJGAZBENZIN</ArtistSlotName>
          <ArtistSlotMeta>рейви</ArtistSlotMeta>
        </ArtistSlot>

        <ArtistSlot state="reserved" no="01">
          <ArtistSlotBar />
          <ArtistSlotMeta>поп-вокал</ArtistSlotMeta>
          <ArtistSlotHint>слот вільний · домен закріплений</ArtistSlotHint>
        </ArtistSlot>
      </ArtistSlotGroup>
    </ArtistsPanel>
  ),
}

export const Active: Story = {
  render: () => (
    <ArtistsPanel className="w-64">
      <ArtistSlot state="active" href="/music">
        <ArtistSlotName>mandrock0</ArtistSlotName>
        <ArtistSlotMeta>/music · електроніка</ArtistSlotMeta>
      </ArtistSlot>
    </ArtistsPanel>
  ),
}

export const Archive: Story = {
  render: () => (
    <ArtistsPanel className="w-64">
      <ArtistSlot state="archive">
        <ArtistSlotName>exDJGAZBENZIN</ArtistSlotName>
        <ArtistSlotMeta>рейви</ArtistSlotMeta>
      </ArtistSlot>
    </ArtistsPanel>
  ),
}

/** The hint is hidden at rest and fades in on hover — hover the tile to see it. */
export const Reserved: Story = {
  render: () => (
    <ArtistsPanel className="w-64">
      <ArtistSlot state="reserved" no="01">
        <ArtistSlotBar />
        <ArtistSlotMeta>поп-вокал</ArtistSlotMeta>
        <ArtistSlotHint>слот вільний · домен закріплений</ArtistSlotHint>
      </ArtistSlot>
    </ArtistsPanel>
  ),
}

/** All six reserved domains, straight out of `reservedSlots()`. */
export const ReservedWall: Story = {
  render: () => (
    <ArtistsPanel className="w-[44rem]">
      <ArtistSlotGroup>
        {reservedSlots(6).map((slot) => (
          <ArtistSlot key={slot.no} state="reserved" no={slot.no}>
            <ArtistSlotBar />
            <ArtistSlotMeta>{slot.domain}</ArtistSlotMeta>
            <ArtistSlotHint>слот вільний · домен закріплений</ArtistSlotHint>
          </ArtistSlot>
        ))}
      </ArtistSlotGroup>
    </ArtistsPanel>
  ),
}

/** The producing credit — inverted so an outside artist never reads as a name. */
export const Feature: Story = {
  render: () => (
    <ArtistsPanel className="w-[26rem]">
      <ArtistFeature href="https://ssch.mandrock.me">
        <ArtistFeatureMeta>
          <span className="tracking-[.2em] uppercase opacity-70">виконавець</span>
          <span className="opacity-70">10 треків</span>
        </ArtistFeatureMeta>
        <ArtistFeatureName>Payalnyk</ArtistFeatureName>
        <ArtistFeatureMeta className="text-[.78rem]">
          <span>альбом ССЧ</span>
          <span className="opacity-70">ssch.mandrock.me →</span>
        </ArtistFeatureMeta>
      </ArtistFeature>
    </ArtistsPanel>
  ),
}

/** The whole `04 / Artists` section as it stands on mandrock.me. */
export const Panel: Story = {
  name: 'Panel (mandrock.me)',
  render: () => (
    <ArtistsPanel className="w-[52rem]">
      <ArtistsPanelHeader>
        <ArtistsPanelEyebrow>04 / Artists</ArtistsPanelEyebrow>
        <ArtistsPanelTitle>Імена й виконавці</ArtistsPanelTitle>
      </ArtistsPanelHeader>

      <ArtistsSection>
        <ArtistsSectionHeader rule="hairline">
          <span className="text-[1.05rem] font-bold tracking-tight">
            Свої імена
          </span>
          <span className="font-mono text-[.7rem] opacity-70">
            псевдоніми під різні домени
          </span>
        </ArtistsSectionHeader>

        <ArtistSlotGroup>
          <ArtistSlot state="active" href="/music">
            <ArtistSlotName>mandrock0</ArtistSlotName>
            <ArtistSlotMeta>/music · електроніка</ArtistSlotMeta>
          </ArtistSlot>

          <ArtistSlot state="archive">
            <ArtistSlotName>exDJGAZBENZIN</ArtistSlotName>
            <ArtistSlotMeta>рейви</ArtistSlotMeta>
          </ArtistSlot>

          {reservedSlots(6).map((slot) => (
            <ArtistSlot key={slot.no} state="reserved" no={slot.no}>
              <ArtistSlotBar />
              <ArtistSlotMeta>{slot.domain}</ArtistSlotMeta>
              <ArtistSlotHint>слот вільний · домен закріплений</ArtistSlotHint>
            </ArtistSlot>
          ))}
        </ArtistSlotGroup>
      </ArtistsSection>

      <ArtistsSection rule="heavy">
        <ArtistsSectionHeader>
          <span className="font-mono text-[.82rem] font-medium tracking-[.18em] uppercase">
            Кого продюсую
          </span>
          <span className="font-mono text-[.7rem] opacity-70">
            сторонні виконавці
          </span>
        </ArtistsSectionHeader>

        <ArtistFeature href="https://ssch.mandrock.me">
          <ArtistFeatureMeta>
            <span className="tracking-[.2em] uppercase opacity-70">
              виконавець
            </span>
            <span className="opacity-70">10 треків</span>
          </ArtistFeatureMeta>
          <ArtistFeatureName>Payalnyk</ArtistFeatureName>
          <ArtistFeatureMeta className="text-[.78rem]">
            <span>альбом ССЧ</span>
            <span className="opacity-70">ssch.mandrock.me →</span>
          </ArtistFeatureMeta>
        </ArtistFeature>
      </ArtistsSection>
    </ArtistsPanel>
  ),
}

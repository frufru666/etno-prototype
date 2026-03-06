import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    template: `
      <Tabs default-value="metadata" class="w-[420px]">
        <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="metadata" class="rounded-lg border border-border p-3 text-sm">
          Core fields, tags, and collection links.
        </TabsContent>
        <TabsContent value="transcript" class="rounded-lg border border-border p-3 text-sm">
          Time-coded transcript lines for media.
        </TabsContent>
        <TabsContent value="map" class="rounded-lg border border-border p-3 text-sm">
          Geo-linked references and locality markers.
        </TabsContent>
      </Tabs>
    `,
  }),
}

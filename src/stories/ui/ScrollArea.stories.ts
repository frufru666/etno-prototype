import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ScrollArea } from "@/components/ui/scroll-area"

const items = Array.from({ length: 20 }).map((_, index) => `Metadata row ${index + 1}`)

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { ScrollArea },
    setup() {
      return { items }
    },
    template: `
      <ScrollArea class="h-60 w-80 rounded-lg border border-border p-2">
        <ul class="space-y-1">
          <li
            v-for="item in items"
            :key="item"
            class="rounded-md border border-border bg-background px-2 py-1 text-sm"
          >
            {{ item }}
          </li>
        </ul>
      </ScrollArea>
    `,
  }),
}

import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { Separator } from "@/components/ui/separator"

const meta = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const HorizontalAndVertical: Story = {
  render: () => ({
    components: { Separator },
    template: `
      <div class="w-96 space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Section title</p>
          <Separator />
        </div>
        <div class="flex h-8 items-center gap-4">
          <span class="text-sm">Left</span>
          <Separator orientation="vertical" />
          <span class="text-sm">Right</span>
        </div>
      </div>
    `,
  }),
}

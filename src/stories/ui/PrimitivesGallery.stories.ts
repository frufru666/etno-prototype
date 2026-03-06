import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"

const meta = {
  title: "UI/Primitives Gallery",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AllAtOnce: Story = {
  render: () => ({
    components: {
      Button,
      Input,
      Checkbox,
      Toggle,
      Badge,
      Select,
      SelectTrigger,
      SelectValue,
      SelectContent,
      SelectItem,
    },
    template: `
      <main class="min-h-screen w-full bg-background p-6 text-foreground md:p-10">
        <section class="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Buttons</h2>
            <div class="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </article>

          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Form controls</h2>
            <Input placeholder="Search..." />
            <label class="flex items-center gap-2 text-sm">
              <Checkbox />
              Include archived items
            </label>
            <Toggle>Toggle</Toggle>
          </article>

          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Status</h2>
            <div class="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </article>

          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Select</h2>
            <Select default-value="image">
              <SelectTrigger>
                <SelectValue placeholder="Typ dokumentu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </article>
        </section>
      </main>
    `,
  }),
}

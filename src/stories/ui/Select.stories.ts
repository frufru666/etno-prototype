import { ref } from "vue"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => ({
    components: {
      Select,
      SelectTrigger,
      SelectValue,
      SelectContent,
      SelectItem,
    },
    setup() {
      const value = ref("all")
      return { value }
    },
    template: `
      <div class="w-72 space-y-2">
        <Select v-model="value">
          <SelectTrigger>
            <SelectValue placeholder="Choose document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
        <p class="text-label-small text-muted-foreground">Value: {{ value }}</p>
      </div>
    `,
  }),
}

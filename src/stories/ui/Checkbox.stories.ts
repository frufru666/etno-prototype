import { ref } from "vue"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { Checkbox } from "@/components/ui/checkbox"

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { checked }
    },
    template: `
      <label class="flex items-center gap-2 text-sm">
        <Checkbox v-model:checked="checked" />
        <span>Show only documents with map data</span>
      </label>
    `,
  }),
}

export const Checked: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <label class="flex items-center gap-2 text-sm">
        <Checkbox :checked="true" />
        <span>Preset checked state</span>
      </label>
    `,
  }),
}

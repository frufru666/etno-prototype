import { ref } from "vue"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { Input } from "@/components/ui/input"

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref("")
      return { value }
    },
    template: `
      <div class="w-80 space-y-2">
        <Input v-model="value" placeholder="Search documents..." />
        <p class="text-label-small text-muted-foreground">Value: {{ value || "—" }}</p>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Input },
    template: `<Input class="w-80" disabled model-value="Locked input value" />`,
  }),
}

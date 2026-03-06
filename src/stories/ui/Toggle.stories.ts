import { ref } from "vue"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { PhTextB } from "@phosphor-icons/vue"
import { Toggle } from "@/components/ui/toggle"

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => ({
    components: { Toggle, PhTextB },
    setup() {
      const pressed = ref(false)
      return { pressed }
    },
    template: `
      <div class="space-y-2">
        <Toggle v-model:pressed="pressed" aria-label="Toggle bold">
          <PhTextB class="h-4 w-4" />
        </Toggle>
        <p class="text-label-small text-muted-foreground">Pressed: {{ pressed }}</p>
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Toggle },
    template: `
      <div class="flex gap-2">
        <Toggle>Default</Toggle>
        <Toggle variant="outline">Outline</Toggle>
        <Toggle size="sm">Small</Toggle>
        <Toggle size="lg">Large</Toggle>
      </div>
    `,
  }),
}

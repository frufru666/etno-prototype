import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ChevronDown } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      Collapsible,
      CollapsibleTrigger,
      CollapsibleContent,
      ChevronDown,
      Button,
    },
    template: `
      <Collapsible class="w-80 rounded-lg border border-border p-2">
        <CollapsibleTrigger as-child>
          <Button variant="ghost" class="flex w-full justify-between">
            Tematické filtre
            <ChevronDown class="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent class="space-y-2 px-2 pb-2 pt-1 text-sm">
          <p>Etnografia mesta</p>
          <p>Ľudová architektúra</p>
          <p>Remeslá</p>
        </CollapsibleContent>
      </Collapsible>
    `,
  }),
}

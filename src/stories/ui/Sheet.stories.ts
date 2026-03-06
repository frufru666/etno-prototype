import type { Meta, StoryObj } from "@storybook/vue3-vite"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    side: "right",
  },
  render: args => ({
    components: {
      Sheet,
      SheetTrigger,
      SheetContent,
      SheetHeader,
      SheetTitle,
      SheetDescription,
      Button,
    },
    setup() {
      return { args }
    },
    template: `
      <Sheet>
        <SheetTrigger as-child>
          <Button>Open sheet</Button>
        </SheetTrigger>
        <SheetContent :side="args.side">
          <SheetHeader>
            <SheetTitle>Filter sidebar</SheetTitle>
            <SheetDescription>Use this panel for compact mobile filters.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    `,
  }),
}

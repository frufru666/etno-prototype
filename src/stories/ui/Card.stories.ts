import type { Meta, StoryObj } from "@storybook/vue3-vite"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      Card,
      CardHeader,
      CardTitle,
      CardDescription,
      CardContent,
      CardFooter,
      Button,
    },
    template: `
      <Card class="w-[360px]">
        <CardHeader>
          <CardTitle>Collection Card</CardTitle>
          <CardDescription>Reusable shell for object metadata.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            This layout can host thumbnails, metadata fields, and actions.
          </p>
        </CardContent>
        <CardFooter class="justify-end">
          <Button size="sm">Open</Button>
        </CardFooter>
      </Card>
    `,
  }),
}

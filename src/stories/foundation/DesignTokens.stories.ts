import type { Meta, StoryObj } from "@storybook/vue3-vite"

const primaryScale = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
const secondaryScale = ["100", "300", "500", "700", "900"]
const textStyles = [
  "text-heading-1",
  "text-heading-2",
  "text-heading-3",
  "text-heading-4",
  "text-body-large",
  "text-body",
  "text-body-small",
  "text-label",
  "text-label-small",
  "text-data",
]

const meta = {
  title: "Foundation/Design Tokens",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => ({
    setup() {
      return {
        primaryScale,
        secondaryScale,
        textStyles,
      }
    },
    template: `
      <main class="min-h-screen w-full bg-background p-6 text-foreground md:p-10">
        <section class="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <header>
            <h1 class="text-heading-2">CT Design Tokens</h1>
            <p class="text-body-small text-muted-foreground">
              Reference for color and typography while polishing components.
            </p>
          </header>

          <section class="space-y-3">
            <h2 class="text-heading-4">Primary palette</h2>
            <div class="grid gap-3 sm:grid-cols-5 lg:grid-cols-10">
              <article
                v-for="step in primaryScale"
                :key="'primary-' + step"
                class="overflow-hidden rounded-md border border-border"
              >
                <div :class="'h-14 bg-primary-' + step" />
                <div class="bg-card p-2 text-center text-label-small">primary-{{ step }}</div>
              </article>
            </div>
          </section>

          <section class="space-y-3">
            <h2 class="text-heading-4">Secondary palette</h2>
            <div class="grid gap-3 sm:grid-cols-5">
              <article
                v-for="step in secondaryScale"
                :key="'secondary-' + step"
                class="overflow-hidden rounded-md border border-border"
              >
                <div :class="'h-14 bg-secondary-' + step" />
                <div class="bg-card p-2 text-center text-label-small">secondary-{{ step }}</div>
              </article>
            </div>
          </section>

          <section class="space-y-3">
            <h2 class="text-heading-4">Typography scale</h2>
            <div class="space-y-2 rounded-lg border border-border bg-card p-4">
              <p v-for="style in textStyles" :key="style" :class="style">
                {{ style }} — Príliš žltý kôň úpěl ďábelské ódy.
              </p>
            </div>
          </section>
        </section>
      </main>
    `,
  }),
}

import type { Meta, StoryObj } from "@storybook/vue3-vite"

type ComponentEntry = {
  name: string
  group: string
  path: string
  hasStory: boolean
}

const componentModules = import.meta.glob("../../components/**/*.vue")
const storyModules = import.meta.glob("../**/*.stories.ts")

const storyPaths = Object.keys(storyModules).map(path => path.toLowerCase())
const components: ComponentEntry[] = Object.keys(componentModules)
  .map((componentPath) => {
    const relativePath = componentPath.replace("../../components/", "")
    const withoutExt = relativePath.replace(".vue", "")
    const segments = withoutExt.split("/")
    const fileName = segments[segments.length - 1] ?? "unknown"
    const group = segments[0] ?? "other"
    const folder = segments[segments.length - 2] ?? ""
    const tokens = [
      withoutExt.toLowerCase(),
      fileName.toLowerCase(),
      `${group}/${fileName.toLowerCase()}`,
      `${folder.toLowerCase()}/${fileName.toLowerCase()}`,
    ]
    const hasStory = storyPaths.some(storyPath => tokens.some(token => storyPath.includes(token)))

    return {
      name: fileName,
      group,
      path: `src/components/${relativePath}`,
      hasStory,
    }
  })
  .sort((a, b) => a.path.localeCompare(b.path))

const grouped = components.reduce<Record<string, ComponentEntry[]>>((acc, component) => {
  if (!acc[component.group]) {
    acc[component.group] = []
  }
  acc[component.group].push(component)
  return acc
}, {})

const groupSummaries = Object.entries(grouped)
  .map(([group, list]) => {
    const covered = list.filter(item => item.hasStory).length
    return {
      group,
      total: list.length,
      covered,
      missing: list.length - covered,
      coverage: `${Math.round((covered / list.length) * 100)}%`,
    }
  })
  .sort((a, b) => a.group.localeCompare(b.group))

const uncovered = components.filter(component => !component.hasStory)

const meta = {
  title: "Audit/Component Inventory",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CoverageDashboard: Story = {
  render: () => ({
    setup() {
      return {
        components,
        uncovered,
        groupSummaries,
      }
    },
    template: `
      <main class="min-h-screen w-full bg-background p-6 text-foreground md:p-10">
        <section class="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <header class="space-y-2">
            <h1 class="text-heading-3">Design System Audit</h1>
            <p class="text-body-small text-muted-foreground">
              Auto-discovered Vue components and Storybook coverage status.
            </p>
          </header>

          <section class="grid gap-3 sm:grid-cols-3">
            <article class="rounded-lg border border-border bg-card p-4">
              <p class="text-label-small text-muted-foreground">Total components</p>
              <p class="text-heading-3">{{ components.length }}</p>
            </article>
            <article class="rounded-lg border border-border bg-card p-4">
              <p class="text-label-small text-muted-foreground">With stories</p>
              <p class="text-heading-3">{{ components.length - uncovered.length }}</p>
            </article>
            <article class="rounded-lg border border-border bg-card p-4">
              <p class="text-label-small text-muted-foreground">Missing stories</p>
              <p class="text-heading-3 text-secondary-700">{{ uncovered.length }}</p>
            </article>
          </section>

          <section class="grid gap-3 md:grid-cols-2">
            <article
              v-for="summary in groupSummaries"
              :key="summary.group"
              class="rounded-lg border border-border bg-card p-4"
            >
              <div class="flex items-center justify-between">
                <h2 class="text-heading-4">{{ summary.group }}</h2>
                <span class="rounded-full bg-primary-50 px-2 py-1 text-label-small text-primary-700">
                  {{ summary.coverage }}
                </span>
              </div>
              <p class="mt-1 text-body-small text-muted-foreground">
                {{ summary.covered }} / {{ summary.total }} covered • {{ summary.missing }} missing
              </p>
            </article>
          </section>

          <section class="space-y-2">
            <h2 class="text-heading-4">Missing story coverage</h2>
            <div class="rounded-lg border border-border bg-card p-3">
              <ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <li
                  v-for="component in uncovered"
                  :key="component.path"
                  class="rounded-md border border-border bg-background p-2"
                >
                  <p class="text-sm font-medium">{{ component.name }}</p>
                  <p class="font-mono text-[11px] text-muted-foreground">{{ component.path }}</p>
                </li>
              </ul>
            </div>
          </section>
        </section>
      </main>
    `,
  }),
}

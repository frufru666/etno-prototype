<script setup lang="ts">
// Logo assets: UESA SAV from https://drive.google.com/drive/folders/1aol1cbQkSFlvy9vDyspGaDAR9F1FhBe1
// Replace placeholder logos with real assets when available.
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto border-t border-border bg-neutral-900 px-4 py-8 text-sm text-neutral-300 md:px-6">
    <div class="mx-auto max-w-4xl">
      <!-- Logos -->
      <div class="flex flex-wrap items-center justify-center gap-8 pb-6">
        <a
          href="https://www.uesa.sav.sk"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 font-semibold text-neutral-200 hover:text-white"
          aria-label="UESA SAV, v. v. i. – web"
        >
          <span class="flex h-10 w-24 items-center justify-center rounded bg-neutral-700 text-xs text-neutral-400">
            UESA SAV
          </span>
          <span class="sr-only">UESA SAV, v. v. i.</span>
        </a>
        <a
          href="https://dariah.sk"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 font-semibold text-neutral-200 hover:text-white"
          aria-label="DARIAH-SK – web"
        >
          <span class="flex h-10 w-24 items-center justify-center rounded bg-neutral-700 text-xs text-neutral-400">
            DARIAH-SK
          </span>
          <span class="sr-only">DARIAH-SK</span>
        </a>
        <a
          href="https://offgridlab.sk"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 font-semibold text-neutral-200 hover:text-white"
          aria-label="Off Grid lab – realizátor, web"
        >
          <span class="flex h-10 w-24 items-center justify-center rounded bg-neutral-700 text-xs text-neutral-400">
            Off Grid lab
          </span>
          <span class="sr-only">Off Grid lab (realizátor)</span>
        </a>
      </div>

      <p class="text-center text-neutral-400">
        Tento repozitár vznikol vďaka finančnej podpore ESFRI výskumných infraštruktúr Ministerstva školstva, výskumu, vývoja a mládeže Slovenskej republiky a národného konzorcia DARIAH-SK.
      </p>

      <p class="mt-4 text-center text-neutral-500">
        © {{ currentYear }} Ústav etnológie a sociálnej antropológie SAV, v. v. i.
      </p>
    </div>
  </footer>
</template>

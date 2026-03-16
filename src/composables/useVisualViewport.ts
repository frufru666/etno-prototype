import { ref, onMounted, onUnmounted } from "vue";

/**
 * Tracks the visual viewport height (e.g. shrinks when mobile keyboard opens).
 * Returns the available height in px for content below a fixed header.
 * @param headerTopPx - Height of the fixed header (e.g. 56 for search bar).
 */
export function useVisualViewport(headerTopPx = 56): { heightPx: { value: number } } {
  const heightPx = ref(
    typeof window !== "undefined" && window.visualViewport
      ? window.visualViewport.height + window.visualViewport.offsetTop - headerTopPx
      : typeof window !== "undefined"
        ? window.innerHeight - headerTopPx
        : 400,
  );

  function update() {
    if (typeof window === "undefined" || !window.visualViewport) return;
    const v = window.visualViewport;
    heightPx.value = Math.max(120, v.offsetTop + v.height - headerTopPx);
  }

  onMounted(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;
    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);
    update();
  });

  onUnmounted(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;
    window.visualViewport.removeEventListener("resize", update);
    window.visualViewport.removeEventListener("scroll", update);
  });

  return { heightPx };
}

export function paginateText(
  text: string,
  container: HTMLElement
): string[] {
  const pages: string[] = [];
  let start = 0;

  const measure = document.createElement("div");
  measure.style.position = "absolute";
  measure.style.visibility = "hidden";
  measure.style.width = `${container.clientWidth}px`;
  measure.style.height = `${container.clientHeight}px`;
  measure.style.font = getComputedStyle(container).font;
  measure.style.lineHeight = getComputedStyle(container).lineHeight;
  measure.style.whiteSpace = "pre-wrap";
  measure.style.wordBreak = "break-word";

  document.body.appendChild(measure);

  while (start < text.length) {
    let low = start;
    let high = text.length;

    // Binary search to find max text that fits
    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      measure.textContent = text.slice(start, mid);

      if (measure.scrollHeight > measure.clientHeight) {
        high = mid - 1;
      } else {
        low = mid;
      }
    }

    pages.push(text.slice(start, low));
    start = low;
  }

  document.body.removeChild(measure);
  return pages;
}

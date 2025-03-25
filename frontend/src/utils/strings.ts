export function sliceText({
  text,
  symbols,
  ellipse = '...',
}: {
  text?: string;
  symbols: number;
  ellipse?: string;
}) {
  if (!text) return text;

  return text.length > symbols
    ? text
        .slice(0, symbols - Number(text[text.length - 1] === '.'))
        .concat(ellipse)
    : text;
}

export function sliceUrl(url: string, n: number) {
  let result = url;

  for (let i = n; i > 0; i--) {
    result = result.substring(0, result.lastIndexOf('/'));
  }

  return result;
}

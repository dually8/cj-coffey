export function getInitialWordSnippet(text: string, wordCount = 50): string {
  if (!text) return '';
  // Regular expression to match common Markdown syntax
  // Clears the following:
  // Bold (**text** or __text__)
  // Italics (*text* or _text_)
  // Strikethrough (~~text~~)
  // Inline code (`text`)
  // Blockquotes (> text)
  // Headers (# text)
  // Links (text)
  // Images (!alt text)
  // Newlines (\n)
  // Tab character (\t)
  // Horizontal lines (---)
  // TODO: Maybe tables? (| table | something |)
  const markdownRegex = /(\*\*|__|\*|_|~~|`|>|#|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\)|(-{3,}))/gi;
  const newlineAndTabRegex = /[\n\t\r]/gm;
  const multipleSpacesRegex = /\s{2,}/g;

  // Replace Markdown syntax with an empty string
  const cleanedText = text
    .replace(markdownRegex, ' ')
    .replace(newlineAndTabRegex, ' ')
    .replace(multipleSpacesRegex, ' ');

  return cleanedText.split(' ').slice(0, wordCount).join(' ').trim() + '...';
}

export function buildAmazonLink(baseUrl: string): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG;
  if (!tag) return baseUrl;
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}tag=${tag}`;
}

export class LocalURL {
  private static verifyUrl(url: string): void {
    if (!url.startsWith('blob:')) {
      throw new Error('Invalid URL')
    }
  }
  static buildUrl(blob: Blob): string {
    this.verifyUrl(URL.createObjectURL(blob))
    return URL.createObjectURL(blob)
  }
  static revokeUrl(url: string): void {
    this.verifyUrl(url)
    URL.revokeObjectURL(url)
  }
}
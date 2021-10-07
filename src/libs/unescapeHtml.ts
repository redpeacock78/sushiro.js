declare global {
  interface String {
    unescapeHtml(): string;
  }
}

String.prototype.unescapeHtml = function (): string {
  return this.replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
};

export {};

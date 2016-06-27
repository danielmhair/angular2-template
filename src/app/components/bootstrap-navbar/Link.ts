export class Link {
  public name: string;
  public externalLink: string;
  public internalLink: string;
  public iconPath: string;

  constructor(name: string, internalLink?: string, externalLink?: string, iconPath?: string) {
    this.name = name;
    this.externalLink = externalLink;
    this.internalLink = internalLink;
    this.iconPath = iconPath;
  }
}

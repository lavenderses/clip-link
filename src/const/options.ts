export enum ClipOption {
  PLAIN_TEXT,
  MARKDOWN,
  TEXT_ONLY,
}

class Options {
  type: ClipOption;
  displayText: string;

  constructor(type: ClipOption, displayText: string) {
    this.type = type;
    this.displayText = displayText;
  }
}

export const options = [
  new Options(ClipOption.PLAIN_TEXT, "plain text"),
  new Options(ClipOption.MARKDOWN, "markdown"),
  new Options(ClipOption.TEXT_ONLY, "text only"),
]
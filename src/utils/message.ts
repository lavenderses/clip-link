import { ClipOption } from "../const/options"

export const getCopiedMessage: (clipOption: ClipOption) => string = (clipOption: ClipOption) => {
  switch (clipOption) {
    case ClipOption.PLAIN_TEXT:
      return "page title & link copied"
    case ClipOption.MARKDOWN:
      return "page title & link (md format) copied"
    case ClipOption.TEXT_ONLY:
      return "page title copied"
  }
}

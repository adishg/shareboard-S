import { FILE } from "dns";

export enum FILE_TYPES {
  WORD = "doc",
  POWERPOINT = "pptx",
  ADOBEAB = "pdf",
  WORD1 = "docx",
  POWERPOINT1 = "ppt",
  PNG = "png",
}

export const SUPPORTED_FILE_FORMAT: any[] = [
  FILE_TYPES.WORD,
  FILE_TYPES.POWERPOINT,
  FILE_TYPES.ADOBEAB,
  FILE_TYPES.WORD1,
  FILE_TYPES.POWERPOINT1,
  FILE_TYPES.PNG
]

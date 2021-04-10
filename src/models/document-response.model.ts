import {IDocumentResponse} from './document.model'

export interface IDocumentUploadResponse {
  status: boolean;
  data: IDocumentResponse;
  message?: string;
}
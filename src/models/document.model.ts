export interface IDocumentResponse {
    data:{
    documentName: string,
    documentType: string,
    filePath: string,
    publisherUsername: string,
    publisher: string,
    layerId: number,
    timestamp: Date}
}
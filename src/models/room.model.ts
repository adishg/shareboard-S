export interface IRoomModel {
    _id: string,
    annotation: any[],
    activity: any[],
    filesPinged: any[],
    eventDescription?: string,
    meetingId?: string,
    eventDate: Date,
    initatorUsername: string,
    initator: string,
    layerId: number,
    timestamp: Date,
    __v: number
}
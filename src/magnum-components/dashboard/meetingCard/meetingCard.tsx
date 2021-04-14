import React from "react";
import "../dashboardMain/dashboardMain.scss";

type MessageProps = {
    children?: React.ReactNode;
    roomInfo: any;
    resumeMeetingBoard: any;
};

export const MeetingCard: React.FC<MessageProps> = ({
    roomInfo,
    resumeMeetingBoard
}: MessageProps) => {
    return (
        <div className="customcard largecard alignend" onClick={(e)=>{
            resumeMeetingBoard(roomInfo)}
        }>
            <div className="greybg">
                <span className="fa fa-plus"> </span>{roomInfo.eventDescription ? roomInfo.eventDescription : 'Resume'}
            </div>
        </div>
    );
};

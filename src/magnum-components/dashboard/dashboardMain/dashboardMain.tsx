/*
 *   Copyright (c) 2021
 *   All rights reserved.
 */
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ROUTES } from "../../../constants/constants";
import { APIService } from "../../../services/api/api-service";
import "./dashboardMain.scss";
import { URLS } from '../../../constants/urls';
import { HTTP_RESPONSE } from "../../../enums/http-responses.enum";
import { CONSTANT } from '../../../constants/constants';
import { IRoomModel } from "../../../models/room.model";
import { MeetingCard } from "../meetingCard/meetingCard";


export const getDashboardListing = async () => {
  try {
    let config = {
      headers: {
        'authorization': await APIService.Instance.getToken(),
      }
    };
    const response = await APIService.Instance.get(URLS.DASHBOARD, config);
    let respdata: IRoomModel;
    if (response.status === HTTP_RESPONSE.SUCCESS) {
      respdata = response.data.data;
      return respdata;
    }
    return [];
  } catch (err) {
    // TODO add error handling
    localStorage.removeItem(CONSTANT.TOKEN);
  }
};

export const startMeeting = async () => {
  try {
    let config = {
      headers: {
        'authorization': await APIService.Instance.getToken(),
      }
    };
    const formData = new FormData();
    formData.append('eventName','');
    formData.append('eventDescription','');
    formData.append('eventDate','');

    const response = await APIService.Instance.post(URLS.ROOM_CREATE, formData,config);
    console.log(response);
    let respdata: IRoomModel;
    if (response.status === HTTP_RESPONSE.SUCCESS) {
      respdata  = response['data']['roomInfo'];
      return respdata;
    }
    return [];
  } catch (err) {
    // TODO add error handling
    localStorage.removeItem(CONSTANT.TOKEN);
  }
};

export const DashboardMain: React.FC = () => {

  const [redirect, setRedirect] = useState<boolean>(false);
  const [roomId, setRoomId] = useState('');
  const [roomList, setRoomList] = useState<IRoomModel[]>([]);

  const startMeet = () => {
      startMeeting().then((data:any) =>{
        console.log(data);
        setRoomId(data.meetingId);
        setRedirect(true);
      })
  };

  const resumeMeetingBoard = (roomInfo: any) => {
    setRoomId(roomInfo.meetingId);
    setRedirect(true);
  }

  useEffect(() => {
      getDashboardListing().then((data: any)=>{
        setRoomList(data);
      });
  }, []);
  
  if (redirect === true) {
   return <Redirect to={ROUTES.ROOT + '#room='+roomId} />;
  }

  
  return (
    <div className="px-0 mainwrapper">
      <div className="row">
        <h3>Create a board</h3>
      </div>
      <div className="row">
        <div className="customcard bluefill" onClick={(e)=>{
          startMeet()
        }}>
          <Link to={ROUTES.ROOT} className="bluefill noborder text-center">
            <span className="fa fa-plus d-block"> </span>New Board
          </Link>
        </div>
      </div>
      <div className="row">
        <h3>All Boards</h3>
      </div>
      <div className="row">
      {roomList.map((roomInfo, index) => {
            return (
              <MeetingCard
              key={index}
              roomInfo={roomInfo}
              resumeMeetingBoard={ resumeMeetingBoard }
              />
            );
        })}
      </div>
    </div>
  );
};

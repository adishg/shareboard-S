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

export const DashboardMain: React.FC = () => {

  const [redirect, setRedirect] = useState<boolean>(false);
  const [roomId, setRoomId] = useState('');
  const [roomList, setRoomList] = useState<IRoomModel[]>([]);

  const submitLogin = () => {
    // login(loginForm).then((res) => {
    //   setRedirect(true);
    // });
  };

  const resumeMeetingBoard = (roomInfo: any) => {
    setRoomId(roomInfo.meetingId);
    setRedirect(true);
  }

  useEffect(() => {
      getDashboardListing().then((data: any)=>{
        console.log(data);
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
        <div className="customcard bluefill">
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

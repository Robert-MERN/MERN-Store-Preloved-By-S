import Chart from "../../components/chart/Chart";
import React, { useState, useEffect } from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useLocation } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import  { Request } from "../../request";

export default function HOMY() {
  const location = useLocation();
  const [ userData, setUserData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  }
  const request = Request(true);
  useEffect(()=>{
    const getUserStats = async()=>{
      setIsLoading(true)
      try {
      const res = await request.get("user/stats");
      res.data.sort((o, n)=> o._id - n._id).map((i)=>{
        return setUserData((oldArray)=> [...oldArray, {"Active User": i.total, name: months[i._id]}])
      })
      setIsLoading(false)
    }catch(err){
      setError(err);
      setIsLoading(false) 
    }}
    getUserStats(); 
  },[])
  return (
      <>
      <div>
        <Topbar/>
      </div>
      <div>
        
          <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <Chart data={userData} title="User Analytics" grid="true" xDataKey={"name"} dataKey="Active User"/>
          <div className="homeWidgets">
            <WidgetSm/>
            <WidgetLg/>
          </div>
        </div>
      </div>
      </>
  );
}

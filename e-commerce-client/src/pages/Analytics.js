import React, { useState, useEffect } from 'react'
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import { Request } from "../request";
import Chart from "../components/chart/Chart";


function Analytics({sales}) {
  const [ orderData, setOrderData ] = useState([])
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
    const getOrderStats = async()=>{
      setIsLoading(true)
      try {
        const res = await request.get("order/income");
        const res2 = await request.get("user/stats");
        res.data.sort((o, n)=> o._id - n._id).map((i)=>{
          return setOrderData((oldArray)=> [...oldArray, {"Sales": i.total, name: months[i._id]}])
        })
        res2.data.sort((o, n)=> o._id - n._id).map((i)=>{
          return setUserData((oldArray)=> [...oldArray, {"Active User": i.total, name: months[i._id]}])
        })
        setIsLoading(false)
    }catch(err){
      setError(err);
      setIsLoading(false) 
    }}
    getOrderStats(); 
  },[])
  return (
    <>
      <div>
        <Topbar/>
      </div>
      <div>
          <Sidebar />
        <div className="home">
          <Chart data={orderData} title="Sales Analytics" grid="true" xDataKey="name" dataKey="Sales"/>
          {!sales&&
            <Chart data={userData} title="User Analytics" grid="true"  xDataKey="name" dataKey="Active User"/>}
        </div>
      </div>
      </>
  )
}

export default Analytics
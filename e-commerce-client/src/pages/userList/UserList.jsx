import "./userList.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Request } from "../../request";
import { useState, useEffect } from "react";

export default function UserList() {
  const [data, setData] = useState([]);
  const request = Request(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const PF =  process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(()=>{
    const fetchUsers = async ()=>{
      setIsLoading(true);
      try {
        const res = await request.get("user/find/all");
        setData(res.data);
        setIsLoading(false);
      } catch(err){
        setError(err);
        setIsLoading(false);
      }
    };
    fetchUsers();
  },[])

  const handleDelete = async(id) => {
    setIsLoading(true)
    try{
      await request.delete(`user/delete/${id}`)
      setIsLoading(false);
      window.location.reload()
    } catch(err){
      setError(err);
      setIsLoading(false);
    }
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profile? params.row.profile:PF + "unknown.jpg"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adm/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
    <Topbar/>
    <Sidebar/>
    <div style={{ height: "calc(100vh - 50px)", width: '95rem', margin: "50px 0 0 20rem"}}>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={14}
        getRowId={row=> row._id}
        checkboxSelection
      />
    </div>
    </>
  );
}

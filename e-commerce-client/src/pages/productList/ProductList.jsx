import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Request } from "../../request";

export default function ProductList() {
  const request = Request(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const fetchProducts = async ()=>{
      setIsLoading(true);
      try {
        const res = await request.get("product/find/all");
        setData(res.data);
        setIsLoading(false);
      } catch(err){
        setError(err);
        setIsLoading(false);
      }
    };
    fetchProducts();
  },[])

  const handleDelete = async(id) => {
    setIsLoading(true)
    try{
      await request.delete(`product/delete/${id}`)
      setIsLoading(false);
      window.location.reload()
    } catch(err){
      setError(err);
      setIsLoading(false);
    }
  };
  
  const columns = [
    { field: "title", headerName: "Name", width: 100, width: 190 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stockQuantity", headerName: "Stock", width: 150 },
    {
      headerName: "Status",
      width: 120,
      renderCell: (params)=> {
        return(
          <p>{params.row.inStock === true? "active": "out-of-stock"}</p>
        )
      }
    },
    {
      field: "sellingPrice",
      headerName: "Price",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adm/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
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
        getRowId={(row)=> row._id}
        pageSize={14}
        checkboxSelection
      />
    </div>
    </>
  );
}

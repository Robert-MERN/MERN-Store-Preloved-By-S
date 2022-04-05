import "./newProduct.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState, useCallback } from "react";
import COLORS from "./Colors";
import { Request } from "../../request";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SelectedItemPopup from "./SelectedItemPopup";

export default function NewProduct() {
  const request = Request(true);
  const [error, setError] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMongo, setSaveMongo] = useState(false);
  const [ fileCheck, setFileCheck ] = useState(false);
  const [ hoverFileCheck, setHoverFileCheck ] = useState(false);
  // other functions
  const sizes = ["Small", "Medium", "Large", "XL", "XXL"];
  const categories = [ "Men", "Women", "Kids", "Jeans", "T-Shirts", "Joggers", "Shoes", "Kurta", "Bags", "Suits", "Jacket", "Socks", "Glasses", "Pants", "Under-Wear", "Shirts", "Coat", "Toys" ];
  const input = [
    {
      id: 1,
      type: "text",
      placeholder: "name",
      label: "Name",
      name: "title",
    },
    {
      id: 2,
      type: "text",
      placeholder: "description",
      label: "Description",
      name: "desc",
    },
    {
      id: 3,
      type: "number",
      placeholder: "Rs. xxx",
      label: "Selling-Price",
      name: "sellingPrice",
    },
    {
      id: 4,
      type: "number",
      placeholder: "Rs. xxx",
      label: "Cost-Price",
      name: "costPrice",
    },
    {
      id: 5,
      type: "number",
      placeholder: "123",
      label: "Stock-Quantity",  
      name: "stockQuantity",
    },
  ];
  const [ productData, setProductData ] = useState({
    img: "",
    hoverImg: "",
    title: "",
    desc: "",
    sellingPrice: Number,
    costPrice: Number,
    stockQuantity: Number,
    categories: Array,
    size: Array,
    color: Array,
    inStock: true,
  })
  const [ file, setFile ] = useState(null)
  const [ hoverFile, setHoverFile ] = useState(null)
  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const onChange = (e)=>{
    if(e.target.name === "color"){
      if (colorList.length > 0){
        if(colorList.some((i)=> i !== e.target.value)){
          setColorList([...colorList, e.target.value])
          setProductData({...productData, [e.target.name]: [...new Set([...colorList, e.target.value])]});
        } 
      } else{
        setColorList([...colorList, e.target.value])
        setProductData({...productData, [e.target.name]: [...new Set([...colorList, e.target.value])]});
      }
    } else if(e.target.name === "size"){
      if (sizeList.length > 0){
        if(sizeList.some((i)=> i !== e.target.value)){
          setSizeList([...sizeList, e.target.value])
          setProductData({...productData, [e.target.name]: [...new Set([...sizeList, e.target.value])]});
        } 
      } else{
        setSizeList([...sizeList, e.target.value])
        setProductData({...productData, [e.target.name]: [...new Set([...sizeList, e.target.value])]});
      }
    } else if(e.target.name === "category"){
      if (categoryList.length > 0){
        if(categoryList.some((i)=> i !== e.target.value)){
          setCategoryList([...categoryList, e.target.value]);
          setProductData({...productData, [e.target.name]: [new Set([...categoryList, e.target.value])]});
        }
      } else{
        setCategoryList([...categoryList, e.target.value]);
        setProductData({...productData, [e.target.name]: [...new Set([...categoryList, e.target.value])]});
      }
    } else if(e.target.name === "img"){
      setFile(e.target.files[0]);
    }else if(e.target.name === "hoverImg"){
      setHoverFile(e.target.files[0]);
    } else{
      setProductData({...productData, [e.target.name]: e.target.value});
    }
  }
  const createProduct = (e)=>{
    if(e){
      e.preventDefault()
    };
    if(!file && !hoverFile){
      setIsLoading(true);
      setSaveMongo(true);
    } else if(file && hoverFile){
      setFileCheck(true);
    } else if(file && !hoverFile){
      setFileCheck(true)
    } else if(!file && hoverFile){
      setHoverFileCheck(true);
    }
      var storage = getStorage(app);
      if(fileCheck){
        const fileName = new Date().getTime() + file.name; 
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setIsLoading(true);
        uploadTask.on('state_changed', 
          (snapshot) => {
          }, 
          (err) => {
            setUploadError(err);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setProductData({...productData, img: downloadURL});
              if(hoverFile){
                setHoverFileCheck(true)
              } else{
                setSaveMongo(true);
                setIsLoading(false);
              }
            });
          }
        );
      }

      // second Image
      if(hoverFileCheck){
        const fileNameHover = new Date().getTime() + hoverFile.name; 
        const storageRefHover = ref(storage, fileNameHover);
        const uploadTaskHover = uploadBytesResumable(storageRefHover, hoverFile);
        uploadTaskHover.on('state_changed', 
          (snapshot) => {
          }, 
          (err) => {
                setUploadError(err);
          }, 
          () => {
            getDownloadURL(uploadTaskHover.snapshot.ref).then((downloadURL) => {
              setProductData({...productData, hoverImg: downloadURL});
              setSaveMongo(true);
              setIsLoading(false);
            });
          }
        );
      }
    }
    useEffect(()=>{
      const createProduct = async()=>{
        if(saveMongo=== true){
          setIsLoading(true)
          try{ 
            console.log(productData);
            await request.post("product/create", productData)
            setIsLoading(false);
            setSaveMongo(false);
            setFileCheck(false);
            setHoverFileCheck(false);
            window.location.reload();
          } catch(err){
            setError(err);
            setIsLoading(false);
            setSaveMongo(false);
          }
        }
      }
      createProduct();
    },[saveMongo])
    const click = (item, identity)=>{
      if(identity === "color"){
        setColorList((old)=> old.filter((i)=> i !== item))
      } else if(identity === "category"){
        setCategoryList((old)=> old.filter((i)=> i !== item))
      } else if(identity === "size"){
        setSizeList((old)=> old.filter((i)=> i !== item))
      }
    } 

    useEffect(createProduct,[uploadError, fileCheck, hoverFileCheck]);
  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form onSubmit={createProduct} className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            {file &&(
              <div className="imageContainer">
                <img  className="productImage" src={URL.createObjectURL(file)} alt="" />
              </div>
            )
            }
            <label aria-required htmlFor="file" >
              <p className="addProductButton" style={{minWidth: "80px", textAlign: "center"}} >Select Image</p>
            </label>
            <input required accept="image/*"  onChange={onChange} name="img" style={{display: "none"}} type="file" id="file" />
          </div>
          <div className="addProductItem">
            <label>Hover-Image</label>
            {hoverFile &&(
              <div className="imageContainer">
                <img  className="productImage" src={URL.createObjectURL(hoverFile)} alt="" />
              </div>
            )
            }
            <label aria-required htmlFor="hoverFile" >
              <p className="addProductButton" style={{minWidth: "80px", textAlign: "center"}} >Select Hover Image</p>
            </label>
            <input required accept="image/*"   onChange={onChange} name="hoverImg" style={{display: "none"}} type="file" id="hoverFile" />
          </div>
          {input.map((inp)=>(
              <div className="addProductItem" key={inp.id} >
                <label>{inp.label}</label>
                <input required type={inp.type} placeholder={inp.placeholder} name={inp.name} onChange={onChange}/>
              </div>
          ))
          }
          <div className="addProductItem">
            <label>In-Stock</label>
            <select name="inStock" id="active" onChange={onChange} >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label>Color</label>
             
            <SelectedItemPopup click={click} name="color" data={colorList} color="true" />

            <select name="color" id="active" onChange={onChange} >
              {COLORS.map((i)=>(
                <option key={i} value={i}>{i}</option>
                ))}
            </select>
            <label>Size</label>
                <SelectedItemPopup click={click} name="size" data={sizeList}/>
            <select name="size" id="active" onChange={onChange} >
              {sizes.map((i)=>(
                  <option key={i} value={i}>{i}</option>
                ))}
            </select>
            <label>Category</label>
                <SelectedItemPopup click={click} name="category" data={categoryList}/>
            <select name="category" id="active" onChange={onChange} >
              {categories.map((i)=>(
                  <option key={i} value={i}>{i}</option>
                ))}
            </select>
          </div>
          <div className="buttonWrapper">
            <button  style={{padding: "10px 80px"}} type="submit" className="submitButton">Create</button>
          </div>
        </form>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: "flex", flexDirection:"column" }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}





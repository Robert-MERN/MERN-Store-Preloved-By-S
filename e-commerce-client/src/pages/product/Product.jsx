import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react"
import COLORS from "../newProduct/Colors";
import { Request } from "../../request"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SelectedItemPopup from "../newProduct/SelectedItemPopup";


export default function Product() {
  const location = useParams().productId;
  const request = Request(true);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMongo, setSaveMongo] = useState(false); 
  const [ file, setFile ] = useState(null)
  const [ hoverFile, setHoverFile ] = useState(null)
  const [ productData, setProductData ] = useState({ inStock: true });
  const [uploadError, setUploadError] = useState(null);
  const [ fileCheck, setFileCheck ] = useState(false);
  const [ hoverFileCheck, setHoverFileCheck ] = useState(false);

    useEffect(()=>{
        const fetchProduct = async()=>{
            setIsLoading(true);
            try{
                const res = await request.get(`product/find/one/${location}`);
                setProduct(res.data);
                setIsLoading(false);
            } catch(err){
                setError(err);
                setIsLoading(false);
            }
        }
        fetchProduct();
      },[location])
    const sizes = ["Small", "Medium", "Large", "XL", "XXL"];
    const categories = [ "Men", "Women", "Kids", "Jeans", "T-Shirts", "Joggers", "Shoes", "Kurta", "Bags", "Suits", "Jacket", "Socks", "Glasses", "Pants", "Under-Wear", "Shirts", "Coat", "Toys" ];
    const input =[
    {
      id: 1,
      type: "text",
      placeholder: product?.title,
      label: "Name",
      name: "title",
    },
    {
      id: 2,
      type: "text",
      placeholder: product?.desc,
      label: "Description",
      name: "desc",
    },
    {
      id: 3,
      type: "number",
      placeholder: product?.sellingPrice,
      label: "Selling-Price",
      name: "sellingPrice",
    },
    {
      id: 4,
      type: "number",
      placeholder: product?.costPrice,
      label: "Cost-Price",
      name: "costPrice",
    },
    {
      id: 5,
      type: "number",
      placeholder: product?.stockQuantity,
      label: "Stock-Quantity",  
      name: "stockQuantity",
    },
  ];

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
        setIsLoading(true);
        try{
          await request.put(`product/update/${product._id}`, productData);
          setIsLoading(false);
          setSaveMongo(false);
          window.location.reload();
        } catch(err){
          setError(err);
          setIsLoading(false);
          setSaveMongo(false);
        }
      } 
    }
    createProduct();
  },[saveMongo, productData]);
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
        <Topbar/>
        <Sidebar />
        <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/adm/newproduct">
            <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            <div className="productTopLeft">
                <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={product?.img} alt="" className="productInfoImg" />
                    <span className="productName">{product?.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">Selling-Price:</span>
                        <span className="productInfoValue">{product?.sellingPrice}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Cost-Price:</span>
                        <span className="productInfoValue">{product?.costPrice}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">sales:</span>
                        <span className="productInfoValue">5123</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">active:</span>
                        <span className="productInfoValue">yes</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">in stock:</span>
                        <span className="productInfoValue">{product?.inStock === true? "Yes": "No"}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form  onSubmit={createProduct} className="addProductForm">
            <div className="addProductItem">
            <label>Image</label>
            {file &&(
              <div className="imageContainer">
                <img  className="productImage" src={URL.createObjectURL(file)} alt="" />
              </div>
            )
            }
            <label htmlFor="file" >
              <p className="addProductButton" style={{minWidth: "80px", textAlign: "center"}} >Select Image</p>
            </label>
            <input  accept="image/*"  onChange={onChange} name="img" style={{display: "none"}} type="file" id="file" />
          </div>
          <div className="addProductItem">
            <label>Hover-Image</label>
            {hoverFile &&(
              <div className="imageContainer">
                <img  className="productImage" src={URL.createObjectURL(hoverFile)} alt="" />
              </div>
            )
            }
            <label htmlFor="hoverFile" >
              <p className="addProductButton" style={{minWidth: "80px", textAlign: "center"}} >Select Hover Image</p>
            </label>
            <input  accept="image/*"  onChange={onChange} name="hoverImg" style={{display: "none"}} type="file" id="hoverFile" />
          </div>
            {input.map((inp)=>(
                <div className="addProductItem" key={inp.id} >
                    <label>{inp.label}</label>
                    <input  type={inp.type} placeholder={inp.placeholder} name={inp.name} onChange={onChange}/>
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
            <button  style={{padding: "10px 80px"}} type="submit" className="submitButton">Update</button>
          </div>
            </form>
        </div>
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

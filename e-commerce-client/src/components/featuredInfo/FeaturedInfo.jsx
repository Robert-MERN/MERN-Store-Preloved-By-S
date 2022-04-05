import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Request } from "../../request";

export default function FeaturedInfo() {
  const [ lastIncome, setLastIncome] = useState(null);
  const [ previousIncome, setPreviousIncome ] = useState(null);
  const [ lastProduct, setLastProduct ] = useState(null);
  const [ previousProduct, setPreviousProduct ] = useState(null);
  const [ allProduct, setAllProduct ] = useState(null);
  const [ totalPreviousCost, setTotalPreviousCost ] = useState(null);
  const [ totalLastCost, setTotalLastCost ] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const request = Request(true);
  useEffect(()=>{
    const getOrder = async()=>{
      setIsLoading(true);
      try{
        const incomeRes = await request.get("order/income?previous='true'");
        const incomeRes2 = await request.get("order/income?last='true'");
        const productRes = await request.get("order/find/products?previous='true'");
        const productRes2 = await request.get("order/find/products?last='true'");
        const productRes3 = await request.get("order/find/products");
        const orderRes = await request.get("order/find?last='true'");
        const orderRes2 = await request.get("order/find?previous='true'");
        setPreviousIncome(incomeRes.data.map((a)=> a.total).reduce((a, b)=> a += b))
        setLastIncome(incomeRes2.data.map((a)=> a.total).reduce((a, b)=> a += b));
        setPreviousProduct(productRes.data.map((a)=> a.costPrice).reduce((a, b)=> a += b));
        setLastProduct(productRes2.data.map((a)=> a.costPrice).reduce((a, b)=> a += b));
        setAllProduct(productRes3.data.map((a)=> a.costPrice).reduce((a, b)=> a += b));
        const previousCost = orderRes.data.map((a)=> {
          for(let i=0; i < a.product.length; i++){
            if(a.product[i].productId === productRes.data[i]._id){
              return (a.product[i].quantity * productRes.data[i].costPrice); 
            }
          }
        });
        setTotalPreviousCost(previousCost.reduce((a, b)=> a += b));

        const lastCost = orderRes2.data.map((a)=> {
          for(let i=0; i < a.product.length; i++){
            if(a.product[i].productId === productRes2.data[i]._id){
              return (a.product[i].quantity * productRes2.data[i].costPrice); 
            }
          }
        })
        setTotalLastCost(lastCost.reduce((a, b)=> a += b));

        setIsLoading(false);
      }catch(err){
        setError(err);
        setIsLoading(false);
      }
    }
    getOrder();
  },[]);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {(previousIncome - lastProduct).toLocaleString("en-US")}</span>
          <span className="featuredMoneyRate">
            {(Math.abs(previousIncome - lastProduct) / lastProduct) * 100}% {(previousIncome - lastProduct) > 0?
              <ArrowUpward className="featuredIcon"/>:(previousIncome - lastProduct) < 0?
              <ArrowDownward className="featuredIcon negative"/>:
              <p className="featuredIcon negative" ></p>
              }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {(previousIncome - lastIncome).toLocaleString("en-US")}</span>
          <span className="featuredMoneyRate">
          {(Math.abs(previousIncome - lastIncome) / lastIncome) * 100}%  {(previousIncome - lastIncome) > 0?
              <ArrowUpward className="featuredIcon"/>:(previousIncome - lastIncome) < 0?
              <ArrowDownward className="featuredIcon negative"/>:
              <p className="featuredIcon negative" ></p>
              }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {(totalPreviousCost - totalLastCost).toLocaleString("en-US")}</span>
          <span className="featuredMoneyRate">
          {(Math.abs(totalPreviousCost - totalLastCost) / totalLastCost) * 100}%  {(totalPreviousCost - totalLastCost) > 0?
              <ArrowUpward className="featuredIcon"/>:(totalPreviousCost - totalLastCost) < 0?
              <ArrowDownward className="featuredIcon negative"/>:
              <p className="featuredIcon negative" ></p>
              }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}

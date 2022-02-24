import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import {mobile} from "../responsive";
import SingleProduct from './SingleProduct';
import { useParams } from 'react-router-dom';
import { Request } from "../request";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';


export default function ProductList({sort, filter}) {
    const [ products, setProducts ] = useState([]); // default procts state
    const [ filteredPro, setFilteredPro ] = useState([]); // filterd products state
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const cat = useParams().category
    const req = Request();
    
    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await req.get(cat && cat !== "all"? `product/find/all?category=${cat}`:"product/find/all");
                setProducts(res.data);
                setIsLoading(false);
            } catch(err){
                setError(err);
                setIsLoading(false);
            }
        };
        fetchData();
    },[cat]);
    useEffect(()=> {
        cat && 
        (setFilteredPro(products.filter((items) =>
            Object.entries(filter).every(([key, value]) =>
                items[key].includes(value))
                )
            )
        );
    },[filter, products, cat]);
    useEffect(()=> {
        if(cat){
            if(sort === "newest"){
                setFilteredPro((prev)=>
                    [...prev].sort((a, b)=> a.createdAt - b.createdAt)
                );
            } else if(sort === "aesc"){
                setFilteredPro((filteredPro)=>
                    [...filteredPro].sort((a, b)=> a.price - b.price)
                );
            } else if(sort === "desc"){
                setFilteredPro((previous)=>
                    [...previous].sort((a, b)=> b.price - a.price)
                );
            }
        }
    },[sort, products, cat]);
    return (
        <>
            {(filteredPro.length > 0) || !cat || (cat === "all")?
                <Container>
                {
                        cat?(
                            (cat && filter)?
                            filteredPro.map((items)=>(
                                <SingleProduct  data={items} key={items._id}/>
                            )):
                            products.sort((a, b)=> a.createdAt - b.createdAt).map((items)=>(
                                <SingleProduct  data={items} key={items._id}/>
                            ))
                        ):
                        products.slice(0, 9).sort((a, b)=> a.createdAt - b.createdAt).map((items)=>(
                            <SingleProduct  data={items} key={items._id}/>
                        )) 
                }
                </Container>:
                <FilterError>
                    No Items were found with such filters.
                    <TravelExploreIcon style={{marginLeft: "20px", transform: "scale(1.6"}} />
                </FilterError>
            }
        </>
        )
    }
    const Container = styled.div`
    padding: 0 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    margin-bottom: 8em;
    ${mobile({display: "flex", flexDirection: "column", padding: "0", overflowX: "hidden"})}
    `
    const FilterError = styled.p`
    color: gray;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    margin-top: 8rem;
    margin-bottom: 10rem;
    `
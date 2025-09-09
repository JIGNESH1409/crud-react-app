import { useState } from "react";
import { addpost } from "../api/Getpost.jsx";

import { useEffect } from "react";

import { updatePostsdata } from "../api/Getpost.jsx";

export const Form=({data,setdata,updateData,setupdateData})=>{
    const [addData,setaddData]=useState({
        title:"",
        body:""
    });


    let isEmpty=Object.keys(updateData).length===0;
    
    const handleInputchange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setaddData({...addData,[name]:value});
    }


    const Postdata=async(addData)=>{
        const res = await addpost(addData); 
        console.log(res.data);
        if(res.status === 201){
            const newdata={...res.data,id: Date.now()}; // Assign a temporary unique ID
            const updatedData = [...data, newdata];
            setdata(updatedData);
            alert("Added successfully");
            localStorage.setItem("postsData", JSON.stringify(updatedData));
        }
    }

    useEffect(()=>{
        updateData && setaddData({
            title:updateData.title || "",
            body:updateData.body || ""
        }) 

    },[updateData])

    const handleformsubmit=(e)=>{
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;

        if (action=="Add"){
            Postdata(addData);
        }

        if(action=="Edit"){ 
            updatePosts();
        }
        
        setaddData({
            title:"",
            body:""
        });

        setupdateData({});
    
    }

    const updatePosts=async()=>{
        const res=await updatePostsdata(updateData.id,addData);

        console.log(res);

        if(res.status===200){
            setdata((prev)=>{
                return prev.map((curElem)=>{
                    return curElem.id===res.data.id ? res.data : curElem
                })
            })

        }


    }



return(
    <form onSubmit={handleformsubmit}>
        <div>
            <label htmlFor="title"></label>
            <input 
            type="text" 
            name="title"
            placeholder="Enter title"
            autoComplete="off"
            id="title"
            value={addData.title}
            onChange={handleInputchange}

            />
        </div>
        <div>
            <label htmlFor="body"></label>
            <input
            type="text"
            name="body"
            placeholder="Enter body"
            autoComplete="off"
            id="body"
            value={addData.body}
            onChange={handleInputchange}
            
            />
        </div>
        <button type="submit" value={isEmpty ? "Add" : "Edit" }> {isEmpty ? "Add" : "Edit" } </button>    
        </form>
);
}
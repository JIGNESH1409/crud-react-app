
import { useEffect } from "react";
import { getpost } from "../api/Getpost.jsx";
import {useState} from "react"
import { deletepost } from "../api/Getpost.jsx";
import "../App.css";
import { Form } from "./Form.jsx";
export const Posts=()=>{
  const [data, setdata] = useState(()=>{
    const saved = localStorage.getItem("postsData");
    return saved ? JSON.parse(saved) : [];
  });

  const [updateData,setupdateData]=useState({});

    const getdata = async () => {
      // Only fetch if not in localStorage
      if (data.length === 0) {
        const res = await getpost();
        console.log(res.data);
        setdata(res.data);
        localStorage.setItem("postsData", JSON.stringify(res.data));
      }
    }


  useEffect(()=>{

    getdata();
  },[])

  const handledelete=async (id)=>{
    try {
      const res = await deletepost(id);
      if (res.status === 200) {
        const updateddata = data.filter((curElem) => curElem.id !== id);
        setdata(updateddata);
        localStorage.setItem("postsData", JSON.stringify(updateddata));
        alert("deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdatedata=(curElem)=>{
    setupdateData(curElem);

  }

  return (
  <>
  <section className="section-form">
    <Form data={data} setdata={setdata} updateData={updateData} setupdateData={setupdateData}/>

  </section>
  <section className="section-post">
    <ol>
        {
            data.map((curElem)=>{
                const {id,title,body}=curElem;
                return <li key={id}>
                    <p className="">Title:{title}</p>
                    <p className="" >Body:{body}</p>
                    <button onClick={()=>handleUpdatedata(curElem)}>Edit</button>
                    <button className="btn-delete" onClick={()=>handledelete(id)}>Delete</button>

                </li>
            })
        }
    </ol>


  </section>
  </>
  );

}

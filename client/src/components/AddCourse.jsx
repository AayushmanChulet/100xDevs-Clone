import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const AddCourse = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    const course =await axios.get(`http://localhost:3300/admin/courses/${id}`, {
      headers: {
        authorization: `${localStorage.getItem('authorization')}`
      }
    });
      console.log(course.data);
      setTitle(course.data.title);
      setDescription(course.data.description);
      setPrice(course.data.price);
      setImageLink(course.data.imageLink);
      setPublished(course.data.published);
      setEdit(true);
  }

  const addCourse = async () => {
    if(edit){
      const res = await axios.put(`http://localhost:3300/admin/courses/${id}`, 
        { 
          title,
          description,
          price : Number(price),
          imageLink, 
          published
        }, 
        {
          headers: {
            Authorization: `${localStorage.getItem("authorization")}` // Ensure correct format
          }
        }
      );
      console.log(res);
      console.log("Course updated");
    }else{
      const res = await axios.post("http://localhost:3300/admin/create", {
        title,
        description,
        price : Number(price),
        imageLink, 
        published
      }, 
      {
        headers: {
          authorization: localStorage.getItem("authorization")
        }
      });
      console.log(res);
      console.log("Course created");
    }

    navigate("/admin");
  }
  return (
    <div className="bg-[#1c1e25] rounded-2xl w-180 px-8 py-8 text-white flex flex-col gap-8">
      <div className="text-center text-3xl font-medium w-full">Create a Course</div>
      <div className="flex flex-col gap-2">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title of the course" className="p-2 bg-[#2E323C] rounded-lg"/>
      </div>
      <div className="flex flex-col gap-2">
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter the description of the course" className="p-2 bg-[#2E323C] rounded-lg"/>
      </div>
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col gap-2 w-1/2">
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter the price of the course" className="p-2 bg-[#2E323C] rounded-lg"/>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label>Published</label>
          <button onClick={() => setPublished(!published)} className="bg-blue-500 rounded-lg p-2 text-white"> {published ? "Going Live" : "Make it Live"} </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label>Image Link</label>
        <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} placeholder="Enter the image link of the course" className="p-2 bg-[#2E323C] rounded-lg"/>
      </div>
      <button onClick={() => addCourse()} className="bg-blue-500 rounded-lg p-2"> Add a Course </button>
      
    </div>
  )
}
export default AddCourse;

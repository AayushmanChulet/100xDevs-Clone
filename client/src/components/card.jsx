import { useNavigate } from "react-router";
import axios from "axios";
const Card = ({ id, title, imageLink, isAdmin, isStore }) => {
  const navigate = useNavigate();
  const handleAddCourse = async () => {
    const response = await axios.post(`http://localhost:3300/user/courses/${id}`,{},{
      headers : {
        authorization : localStorage.getItem('authorization'),
      }
    })
    console.log(response);
  }
  return (
    <div className="w-100 bg-[#030712] m-9 flex flex-col rounded-xl overflow-hidden">
      <img
        src={imageLink}
        alt="Course_Image"
        className="h-[65%] shadow-[inset_0px_0px_100px_50px_rgba(0,0,0,0.8)] "
      />
      <div className="flex flex-col justify-between items-start p-2 w-full gap-2">
        <div className="text-white font-medium text-2xl">{title}</div>
        {isStore ? (
          <button
            className="rounded bg-white p-3 scroll-px-36 font-medium w-full"
            onClick={() => handleAddCourse()}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex flex-row justify-end items-center w-full gap-5 ">
            <button className="rounded bg-white p-3 scroll-px-36 font-medium w-1/2 ">
              {" "}
              View course
            </button>
            {isAdmin ? (
              <button
                className="text-white p-3 font-medium w-1/2"
                onClick={() => navigate(`/admin/courses/${id}`)}
              >
                Edit Course
              </button>
            ) : (
              <button className="text-white p-3 font-medium w-1/2">
                Join Discord
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";

const Store = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get('http://localhost:3300/user/courses',{
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      });
      setCourses(response.data);
    };
    fetchCourses();
  }, []);
    return (
        <div>
            <h1>Store</h1>
            <div className="grid grid-cols-3">
              {courses.map((course) => (
                  <Card key={course._id} id={course._id} title={course.title} imageLink={course.imageLink} isStore={true} />
              ))}
            </div>
        </div>
    )
}

export default Store;

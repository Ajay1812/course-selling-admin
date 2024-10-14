import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export function PurchasedCourse() {
  const location = useLocation();
  const [data, setData] = useState('')
  const { courseId } = location.state || {};
  function fetchInfo() {
    const response = fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    setData(Array.isArray(response.courses) ? response.courses : []);
    console.log(response.courses);
  };
  useEffect(() => {
    fetchInfo();
  }, [courseId]);

  return <>
    <div>
      {courseId}
    </div>
  </>
}

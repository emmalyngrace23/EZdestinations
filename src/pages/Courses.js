import {useState, useEffect} from 'react';
import coursesData from '../data/coursesData';
import CourseCard from '../components/CourseCard';


export default function Courses() {

	const [courses, setCourses] = useState([]); 
	
	// console.log(coursesData);
	// console.log(coursesData[0]);

	useEffect(() => {
		fetch('http://localhost:4000/courses')
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setCourses(data.map(course => {
		return (
			<CourseCard key={course._id} courseProp={course}/>
			);
		}));
		})
	}, [])


/*const courses = coursesData.map(course => {
	console.log(course)
	return (
		<CourseCard key={course.id} courseProp={course}/>
	);
});
*/
	return (
		<>
			<h1>Courses</h1>
			{courses}
		</>
	)
}

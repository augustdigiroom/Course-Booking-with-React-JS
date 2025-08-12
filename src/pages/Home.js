import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedCourses from '../components/FeaturedCourses';

export default function Home() {

	const data = {
	    title: "Zuitt Coding Bootcamp",
	    content: "Opportunities for everyone, everywhere",
	    destination: "/courses",
	    buttonLabel: "Enroll now!"
	}

	return (
		<>
			<Banner data={data}/>
			<FeaturedCourses />

			<div className="text-center my-4">
  					<img src="./codes.jpg" alt="Middle Section" className="img-fluid rounded" />
			</div>

			<Highlights />
		</>
	)
}
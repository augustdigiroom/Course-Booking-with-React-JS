import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PreviewCourses from './PreviewCourses'

export default function FeaturedCourses(){

	const [previews, setPreviews] = useState([])

	useEffect(() => {
		fetch("http://localhost:4000/courses/")
		.then(res => res.json())
		.then(data => {
			console.log(data)

			// Create two empty arrays to be used to store random numbers and featured course data.
			const numbers = []
			const featured = []

			// This function generates a random number between 0 and the length of the data array (the fetched course data). It checks if the random number has already been added to the numbers array. If not, it adds the random number to the numbers array. If the random number already exists in the numbers array, it recursively calls itself to generate a new random number.
			const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.length)

				if(numbers.indexOf(randomNum) === -1){
					numbers.push(randomNum)
				}else{
					generateRandomNums()
				}
			}

			// A loop is used to iterate five times (from 0 to 4). Inside the loop, the generateRandomNums function is called to generate a random number and push it into the numbers array.
			for(let i = 0; i < 5; i++){
				generateRandomNums()

				// For each iteration of the loop, the PreviewCourses component is rendered with the corresponding course data from the data array based on the random number. The key prop is set to the _id of the course for React's reconciliation to track components efficiently. The resulting JSX is pushed into the featured array.
				featured.push(

					// the breakPoint here is for columns
					<PreviewCourses data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2} />
					) 
			}

			// After the loop finishes, the setPreviews function is called to update the state of the component with the featured array. This state update triggers a re-render, and the PreviewCourses components are displayed on the page.
			setPreviews(featured)
		})
	}, [])

	return (
			  <div className="my-5"> {/* my-5 adds top & bottom margin */}
			    	<h2 className="text-center mb-4">Featured Courses</h2> {/* mb-4 adds spacing below heading */}
			    <CardGroup className="justify-content-center">
			      {previews}
			    </CardGroup>
			  </div>
			);

}
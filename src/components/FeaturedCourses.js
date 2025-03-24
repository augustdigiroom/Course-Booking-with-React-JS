import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PreviewCourses from './PreviewCourses';

export default function FeaturedCourses(){

	const [previews, setPreviews] = useState([]);

	useEffect(() => {

		fetch('http://localhost:4000/courses/')
		.then(res => res.json())
		.then(data => {

			console.log(data);

			// Create two empty arrays to be used to store random numbers and featured courses data
			const numbers = [];
			const featured = [];

			// This function generates a random number between 0 and the length of the data array (the fetched course data). It checks if the random number has already been added to the numbers array. if not, it adds the random number to the number array. Else, if the random number already exists in the number array, it recursive calls itself to generate a new random number. 
			const generateRandomNums = () => {

				let randomNum = Math.floor(Math.random() * data.length)

				if(numbers.indexOf(randomNum) === -1) {
					numbers.push(randomNum)
				}else{
					generateRandomNums()
				}

				console.log(numbers);
			}

			for(let i=0; i < 5; i++) {
				generateRandomNums();

				featured.push(
					<PreviewCourses data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2}/>

				)
			}

			setPreviews(featured);
		})

	}, []);

	return(

		<>
			<h2 className="text-center"> Featured Courses </h2>
			<CardGroup className="justify-content-center">

			{previews}

			</CardGroup>
		</>
	)
}
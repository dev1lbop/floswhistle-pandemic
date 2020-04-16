import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import ActionButton from 'shared/ActionButton';


const HomePage = props => {
	return (
		<div className="HomePage">
			<div className="Hero">
				<div className="HeroColumn">
					<Link className="HeroButton" to="/map">CURIOUS?<br></br>CHECK STATS</Link>
					<HashLink className="HeroButton" to="#ActionButton">SCROLL TO<br></br>FILE REPORT</HashLink>
				</div>
			</div>

			<div className="content">
				<p>
				<b>Flo's Whistle: Pandemic</b> is a secure, anonymous platform
				where direct patient care providers in the U.S. can report, once
				a day, on workplace deficits that are endangering them and their
				patients.
				</p>
				<p>
				The COVID-19 pandemic is exposing many lethal faults in our
				healthcare system. Direct care providers can see, from within
				the system, where dangers lie. As witnesses on the front lines,
				if we can report our first hand knowledge, we can contribute to
				a fuller understanding of the pandemic situation as it unfolds.
				</p>
				<p>
				This independent data collection experiment builds on the 2018
				nurse staffing project, Flo’s Whistle. Reports are aggregated and
				displayed on a dashboard, which includes a map of the U.S. We do
				not ask for any personally identifiable data.
				</p>
				<p>
				With the Flo’s Whistle projects, we’re following the example of
				pioneering statistician, public health advocate and nurse,
				Florence Nightingale. Her research and visual display of data
				revealed patterns in causes of death among soldiers in the Crimean
				War, lighting the way for rational policy reforms and dramatically
				reducing suffering and loss of life.
				</p>
				<p>
				We hope to do the same.
				</p>
			</div>

			<div id="ActionButton"></div>
			<ActionButton/>
		</div>
	);
};

export default HomePage;

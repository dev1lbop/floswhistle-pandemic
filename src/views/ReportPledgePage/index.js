import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import Storage from '../../Storage';


const TYPE_OPTIONS = [
    { value: 'rn', label: 'RN' },
    { value: 'lpn', label: 'LPN' },
    { value: 'cna', label: 'CPCT/CNA'}
];

class ReportPledgePage extends React.Component {

	constructor(props, context) {
		super(props, context);

        let saved = Storage.getSavedValues();

		this.state = {
			typeSelection: saved.reporter_type
		};

		this.onTypeChange = this.onTypeChange.bind(this);
	}

	onTypeChange(newType) {
		this.setState({typeSelection: newType});
		Storage.updateValue('reporter_type', newType);
	}

	render() {
		return (
			<div className="ReportPledgePage">
				<h2>Attestation</h2>
				<label>I am a: </label>
				<Select
					onChange={this.onTypeChange}
					options={TYPE_OPTIONS}
					simpleValue
					clearable={false}
					searchable={false}
					value={this.state.typeSelection}
				/>
				<p>
					By agreeing to this statement and submitting
					information to Flo’s Whistle: Pandemic, I swear that I...
				</p>
				<ul>
					<li>
						am a state licensed/certified patient care provider
						as indicated above
					</li>
					<li>
						am currently working in my professional capacity in the
						setting I'm reporting about
					</li>
					<li>
						was present in that setting on the date for which I am
						reporting
					</li>
					<li>
						have first hand knowledge about all the conditions
						I describe
					</li>
				</ul>

				<div className="agreement-button">
					<Link className="button" to="/report">Agree<br></br>proceed to<br></br>reporting</Link>
				</div>

			</div>
		);
	}
};

export default ReportPledgePage;

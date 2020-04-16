import React from 'react';
import { Link } from 'react-router-dom';


const ActionButton = props => {
	return (
		<div className="ActionButton">
            <p className="header">
                TAKE ACTION
            </p>
			<p>
				Eligibility for reporting: only professionally
				licensed / state certified direct nursing care
				providers, currently working in that capacity
				in EMS/pre-hospital care, urgent care,
				hospital, nursing home, or LTCH are eligible
				to participate.
			</p>
			<p>
				If you're not eligible to report, you can go
				directly to the dashboard.
			</p>
            <Link className="button" to="/pledge">
                DIRECT CARE
								<br></br>
								PROVIDERS
								<br></br>
								ONLY
            </Link>
		</div>
	);
};

export default ActionButton;

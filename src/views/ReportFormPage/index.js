import React from 'react';
import Select from 'react-select';
import Checkbox from '@material/react-checkbox';
import Radio, {NativeRadioControl} from '@material/react-radio';
import moment from 'moment';
import "@material/form-field/dist/mdc.form-field.css";
import "@material/react-radio/dist/radio.css";

import Storage from '../../Storage';

const API_ENDPOINT = 'https://api.floswhistle.com/v1/report';
//const API_ENDPOINT = 'http://localhost:6001/v1/report';

const FACILITY_TYPE_OPTIONS = [
  { value: 'hospital', label: 'Hospital' },
  { value: 'long_term_care', label: 'Nursing Home/LTAC/LTCH'}
];

const getDate = (date) => moment(`${date}`, 'MM/DD/YYYY').unix();

const formatBody = ({
  reported_date, ...rest
}) => ({
  ...rest,
  reported_date: getDate(reported_date)
});

class ReportFormPage extends React.Component {
  constructor(props) {
    super(props);

    let today = moment().format('MM/DD/YYYY');
    let saved = Storage.getSavedValues();
    this.state = {
      reporter_type: saved.reporter_type,
      facility_type: saved.facility_type,
      zip: saved.zip,
      reported_date: today,
      surgical_masks: false,
      n95_masks: false,
      papr_hoods: false,
      non_sterile_gloves: false,
      isolation_gowns: false,
      face_shields: false,
      oxygen: false,
      sedatives: false,
      narcotic_analgesics: false,
      paralytics: false,
      icu_beds: false,
      icu_trained_nurses: false,
      ventilators: false,
      test_none: false,
      test_tried: false,
      test_no_result: false,
      test_swab_neg: false,
      test_swab_pos: false,
      test_anti_neg: false,
      test_anti_pos: false,
      willing_to_report: null,
      comment: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleChange(property, value) {
    let changes = {};
    changes[property] = value;
    this.setState(changes);
    Storage.updateValue(property, value);
  }

  handleReport(event) {
    event.preventDefault();

    const body = JSON.stringify(formatBody(this.state));

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    }).then(response => {
      window.location = '/thanks';
    });
  }

  render() {

    let today = moment().format('MM/DD/YYYY');
    let yesterday = moment().subtract(1, 'day').format('MM/DD/YYYY');
    let twodaysago = moment().subtract(2, 'day').format('MM/DD/YYYY');

    let dateOptions = [
      {value: today, label: today},
      {value: yesterday, label: yesterday},
      {value: twodaysago, label: twodaysago}
    ];

    return (
      <div className="ReportFormPage">

        <h2 className="title">Report</h2>
        <p>
          You can only file one report in a 24 hour period.
        </p>

        <form>
          <fieldset>
            <label htmlFor="locationtype">Clinical Setting:</label>
            <Select
              onChange={(newVal) => {
                this.handleChange('facility_type', newVal);
              }}
              options={FACILITY_TYPE_OPTIONS}
              simpleValue
              clearable={false}
              searchable={false}
              value={this.state.facility_type} />
          </fieldset>

          <fieldset>
            <label htmlFor="zip">Facility/Base Station Zip Code:</label>
            <div>
              <input type="text"
                className="textInput"
                name="zip"
                value={this.state.zip}
                onChange={(evt) => {
                  this.handleChange('zip', evt.target.value);
                }} />
            </div>
          </fieldset>

          <fieldset>
            <label htmlFor="report_date">Date:</label>
            <Select
              onChange={(newVal) => {
                this.handleChange('report_date', newVal);
              }}
              options={dateOptions}
              simpleValue
              clearable={false}
              searchable={false}
              value={this.state.report_date} />
          </fieldset>
          <p>Today I experienced shortages of these resources needed for COVID-19 patients</p>
          {[
            {id: 'surgical_masks', name: 'Surgical Masks'},
            {id: 'n95_masks', name: 'N95 Masks'},
            {id: 'papr_hoods', name: 'PAPR Hoods'},
            {id: 'non_sterile_gloves', name: 'Non-Sterile Gloves'},
            {id: 'isolation_gowns', name: 'Isolation Gowns'},
            {id: 'face_shields', name: 'Face Shields'},
            {id: 'oxygen', name: 'Oxygen'},
            {id: 'sedatives', name: 'Sedatives'},
            {id: 'narcotic_analgesics', name: 'Narcotic Analgesics'},
            {id: 'paralytics', name: 'Paralytics'},
            {id: 'icu_beds', name: 'ICU Beds'},
            {id: 'icu_trained_nurses', name: 'ICU Trained Nurses'},
            {id: 'ventilators', name: 'Ventilators'}
          ].map(item => {
            return (
              <fieldset className="noPadding" key={item.id}>
                <div className="mdc-form-field">
                  <Checkbox
                    onChange={(evt) => {
                      this.handleChange(item.id, evt.target.checked);
                    }}
                    name={item.id}
                    checked={this.state[item.id]} />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
              </fieldset>)
          })}

          <p>Your current status re: COVID lab tests</p>
          {[
            {id: 'test_none', name: 'I\'ve not sought testing'},
            {id: 'test_tried', name: 'Tried but couldn\'t get tested'},
            {id: 'test_no_result', name: 'Tested - no result yet'},
            {id: 'test_swab_neg', name: 'Swab test - NEG'},
            {id: 'test_swab_pos', name: 'Swab test - POS'},
            {id: 'test_anti_neg', name: 'Antibody test - NEG'},
            {id: 'test_anti_pos', name: 'Antibody test - POS'}
          ].map(item => {
            return (
              <fieldset className="noPadding" key={item.id}>
                <div className="mdc-form-field">
                  <Checkbox
                    onChange={(evt) => {
                      this.handleChange(item.id, evt.target.checked);
                    }}
                    name={item.id}
                    checked={this.state[item.id]} />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
              </fieldset>)
          })}
          <p>
            Reports from anonymous sources are less credible than
            those from known sources. Would you ever be willing to
            verify your identity to this project, via your professional
            credential, in order for your anonymous contributions to
            be attributed to a “verified source?”
          </p>
          <fieldset className="radioPadding">
            <Radio label='Yes - I’d do it now if given the opportunity' key='yes'>
              <NativeRadioControl
                name='willing_to_report'
                value={1}
                id='yes'
                onChange={(e) => {
                  this.handleChange('willing_to_report', e.target.value)
                }}
              />
            </Radio>
          </fieldset>
          <fieldset className="radioPadding">
            <Radio label='Only if I was confident I could not be traced. I’m concerned about retaliation.' key='only'>
              <NativeRadioControl
                name='willing_to_report'
                value={2}
                id='only'
                onChange={(e) => {
                  this.handleChange('willing_to_report', e.target.value)
                }}
              />
            </Radio>
          </fieldset>
          <fieldset className="radioPadding">
            <Radio label='No - I’ll never be confident enough that I can’t be traced or feel certain I’m free from possible retaliation.' key='no'>
              <NativeRadioControl
                name='willing_to_report'
                value={3}
                id='no'
                onChange={(e) => {
                  this.handleChange('willing_to_report', e.target.value);
                }}
              />
            </Radio>
          </fieldset>
          <p>
            Comments
          </p>
          <fieldset>
            <textarea 
              value={this.state.comment}
              onChange={(e) => {
                this.handleChange('comment', e.target.value);
              }}></textarea>
          </fieldset>
        </form>

        <div className="buttons">
          <button className="button" onClick={this.handleReport}>Submit</button>
        </div>
      </div>
    );
  }
};

export default ReportFormPage;

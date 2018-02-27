import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';


export default class InvoiceAmountsPartial extends React.Component {

  render() {
    return (
        <div>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>
                Invoice Amount
              </ControlLabel>
            </Col>
            <Col sm={5}>
              <FormControl
                  type="text"
                  name="invoice.amount"
                  value={this.props.invoice.amount}
                  onChange={this.props.formikProps.handleChange}
                  placeholder="Enter amount"
              />
              { this.props.formikProps.touched.invoice && this.props.formikProps.touched.invoice.amount
                && this.props.formikProps.errors.invoice && this.props.formikProps.errors.invoice.amount
                && <p>{this.props.formikProps.errors.invoice.amount}</p>}
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>
                Balance Due
              </ControlLabel>
            </Col>
            <Col sm={5}>
              <FormControl
                  type="text"
                  name="invoice.due"
                  value={this.props.invoice.due}
                  onChange={this.props.formikProps.handleChange}
                  placeholder="Enter balance due"
              />
              {this.props.formikProps.errors.invoice && this.props.formikProps.errors.invoice.due
                && <p>{this.props.formikProps.errors.invoice.due}</p>}
            </Col>
          </FormGroup>
        </div>
    );
  }

}


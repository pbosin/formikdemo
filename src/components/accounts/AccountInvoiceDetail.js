import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import { withFormik } from 'formik';
import Yup from "yup";
import AccountService from "../../utils/AccountService";

import InvoiceAmounts from './InvoiceAmounts';

const formikWrapper = withFormik({
  mapPropsToValues: props => {
    return {
      account: props.account || AccountService.getBlankAccount(),
      invoice: (props.invoice.length) ? props.invoice : AccountService.getBlankInvoice()
    }},
  validationSchema: Yup.object().shape({
    invoice: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      amount: Yup.number().typeError('Amount should be a number').moreThan(0, 'Amount is required'),
      due: Yup.number()
          .typeError('Balance due should be a number')
          .required('Balance due is required')
          .max(Yup.ref('amount'), 'Balance due can not be greater than amount')
    })
  }),
  // handleSubmit takes form values and formicBag, from which we take setErrors and form component props
  handleSubmit(values, {setErrors, props}) {
    if (!values.invoice.name || !values.invoice.amount || !values.invoice.due) {
      if(!values.invoice.name) {
        setErrors({"invoice.name": 'Please enter invoice name'});
      }
      if(!values.invoice.amount) {
        setErrors({"invoice.amount": 'Please enter invoice amount'});
      }
      if(!values.invoice.due) {
        setErrors({"invoice.due": 'Please enter outstanding balance due'});
      }
    } else {
      props.save(values.invoice);
    }
  }
});


class AccountInvoiceDetail extends React.Component {

  // we need to re-render the form when the data is received from the server
  componentWillReceiveProps(nextProps) {
    if (nextProps.account.name !== this.props.account.name) {
      this.props.resetForm(nextProps);
      // re-mapping props to values, since resetForm will drop some mapped values
      this.props.setValues({...this.props.values, invoice: nextProps.invoice});
    }
  }

  render() {
    // Formik props are available via 'this.props'
    if (!this.props || !this.props.values) {
      console.log('undefined');
      return (<div>Invalid data for invoice. </div>);
    }
    return (
        <div>
          <h4> Account "{this.props.account.name}" Invoice </h4>
          <Form horizontal onSubmit={this.props.handleSubmit}>
            <FormGroup>
              <Col sm={2}>
                <ControlLabel>
                  Invoice Name
                </ControlLabel>
              </Col>
              <Col sm={5}>
                <FormControl
                    type="text"
                    name="invoice.name"
                    value={this.props.values.invoice.name}
                    onChange={this.props.handleChange}
                    placeholder="Enter name"
                />
                {this.props.touched.invoice && this.props.touched.invoice.name
                && this.props.errors.invoice && this.props.errors.invoice.name
                && <p>{this.props.errors.invoice.name}</p>}
              </Col>
            </FormGroup>
            <InvoiceAmounts invoice={this.props.values.invoice} formikProps={this.props} />
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <ButtonToolbar>
                  <Button type="submit" bsSize="sm" bsStyle="primary" disabled={this.props.isSubmitting}>Save</Button>
                  <Button bsSize="sm">
                    <Link to={`/accounts/${this.props.account.id}/invoices`}> Cancel </Link>
                  </Button>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        </div>
    );
  }
}

export default formikWrapper(AccountInvoiceDetail);
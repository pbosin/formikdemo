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

const formikWrapper = withFormik({
  mapPropsToValues: props => {
    return {
      account: props.account || AccountService.getBlankAccount(),
      invoice: props.invoice || {},
      name: props.invoice.name || '',
      amount: props.invoice.amount || 0,
      due: props.invoice.due || 0,
      save: props.save
    }},
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required')
  }),
  // handleSubmit takes form values and formicBag, from which we take setErrors and form component props
  handleSubmit(values, {setErrors, props}) {
    let valid = true;
    if(!values.name) {
      setErrors({name: 'Please enter invoice name'});
      valid = false;
    }
    if(!values.amount) {
      setErrors({amount: 'Please enter invoice amount'});
      valid = false;
    }
    if(!values.due) {
      setErrors({due: 'Please enter outstanding amount due'});
      valid = false;
    }

    if (valid) {
      values.save(Object.assign(props.invoice, {name: values.name, amount: values.amount, due: values.due}));
    }
  }
});



class AccountInvoiceDetail extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.account.name !== this.props.account.name) {
      this.props.resetForm(nextProps);
      this.props.setValues({...this.props.values, ...nextProps.invoice});
    }
  }

  render() {
    // Formik props are available via 'this.props'
    if (!this.props || !this.props.values || this.props.values.name === undefined) {
      console.log('ubndefined')
      // return (<div></div>);
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
                    name="name"
                    value={this.props.values.name}
                    onChange={this.props.handleChange}
                    placeholder="Enter name"
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={2}>
                <ControlLabel>
                  Invoice Amount
                </ControlLabel>
              </Col>
              <Col sm={5}>
                <FormControl
                    type="text"
                    name="amount"
                    value={this.props.values.amount}
                    onChange={this.props.handleChange}
                    placeholder="Enter amount"
                />
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
                    name="due"
                    value={this.props.values.due}
                    onChange={this.props.handleChange}
                    placeholder="Enter balance due"
                />
              </Col>
            </FormGroup>
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
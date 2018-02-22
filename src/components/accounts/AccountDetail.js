import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';

export class AccountDetail extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.name !== this.props.name) {
      this.props.resetForm(nextProps);
    }
  }

  render() {
    // Formik props are available on 'this.props'
    return (
        <div>
          <Form horizontal onSubmit={this.props.handleSubmit}>
            <FormGroup>
              <Col sm={2}>
                <ControlLabel>
                  Account Name
                </ControlLabel>
              </Col>
              <Col sm={5}>
                <FormControl
                    name="name"
                    type="text"
                    value={this.props.values.name}
                    onChange={this.props.handleChange}
                    placeholder="Enter name"
                />
                {this.props.touched.name && this.props.errors.name && <p>{this.props.errors.name}</p>}
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <ButtonToolbar>
                  <Button type="submit" bsSize="sm" bsStyle="primary" disabled={this.props.isSubmitting}>Save</Button>
                  <Button bsSize="sm">
                    <Link to="/accounts"> Cancel </Link>
                  </Button>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        </div>
    );
  }
}


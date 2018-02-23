import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

export const AccountInvoiceList = (props) => (
    <div>
      <h4>
        Account "{props.account.name}" Invoices
        <Button bsSize="xsmall" className="ml15">
          <Link to="/accounts">Back To Account List</Link>
        </Button>
      </h4>
      <table>
        <tbody>
        <tr>
          <th>Invoice ID</th>
          <th>Invoice Name</th>
          <th>Invoice Amount</th>
          <th>Amount Due</th>
          <th><Button bsSize="xsmall"><Link to={`/accounts/${props.account.id}/invoices/0`}>Add New Invoice</Link></Button></th>
        </tr>
        {props.account.invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.name}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.due}</td>
              <td>
                <Button bsSize="xsmall">
                  <Link to={`/accounts/${props.account.id}/invoices/${invoice.id}`}>
                    <Glyphicon glyph="pencil"/>
                  </Link>
                </Button>
                <Button bsSize="xsmall" onClick={() => props.deleteInvoice(props.account.id, invoice.id)}>
                  <Glyphicon glyph="trash"/>
                </Button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
);

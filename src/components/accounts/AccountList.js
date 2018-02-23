import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

export const AccountList = (props) => (
    <div>
      <table>
        <tbody>
        <tr>
          <th>Name</th>
          <th>
            <Button bsSize="xsmall">
              <Link to='/accounts/0'>Add New Account</Link>
            </Button>
          </th>
        </tr>
        {props.accounts.map(account => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>
                <Button bsSize="xsmall">
                  <Link to={`/accounts/${account.id}`}>
                    <Glyphicon glyph="pencil"/>
                  </Link>
                </Button>
                <Button bsSize="xsmall" onClick={() => props.deleteAccount(account)}>
                  <Glyphicon glyph="trash"/>
                </Button>
                <Button bsSize="xsmall">
                  <Link to={`/accounts/${account.id}/invoices`}>
                    View Invoices
                  </Link>
                </Button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
);


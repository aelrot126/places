import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Historical extends Component {
  constructor() {
    super();
    this.state = {
      addr: '',
      name: '',
      placetype: '',
      errors: {},
      result: [
        {
          name: '',
          description: '',
          photo_reference: '',
          comiclink: '',
        }
      ]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ result: [] });
    axios
      .post('/delete')
      .then(result => {
        console.log('All docs deleted');
      })
      .catch(error => {
        console.log('Failed to delete all: ', error);
      });
  }

  componentDidMount() {
    axios
      .post('/historical')
      .then(result => {
        this.setState({ result: result.data });
      })
      .catch(error => {
        console.log('error+++++ >:', error);
      });
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Your Previous Searches MARVEL HEROES!</h1>

        </div>
        <div className="row container-fluid">
          <div className="col-md-1 text-center">
            <button
              className="btn btn-danger btn-lg"
              onClick={this.handleClick}
            >
              Delete All
            </button>
            <p />
          </div>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>photo</th>
                <th>Comic Link</th>
              </tr>
              {this.state.result.map(result => {
                return (
                  <tr key={result.name}>
                    <td>{result.name}</td>
                    <td>{result.description}</td>
                    <td>
                      <img src={result.photo_reference} width="100px" />
                    </td>
                    <td><Link to={result.comiclink}>{result.comiclink}</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Historical;

import React from 'react';
import { Link } from 'react-router-dom';

const Result = props => {
  //console.log(props.list.length);

  return (
    <div className="row container-fluid">
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Photo</th>
            <th>Comic Link</th>
          </tr>
          {props.list.map(result => {
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
  );
};

export default Result;

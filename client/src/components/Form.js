import React, { Component } from 'react';

onSubmit(e){
  e.preventDefault();
  axios.post('/getplaces',newQuery)
  .then((result) =>{
     console.log(result);
  })
  .catch((err)=>{
    console.log(err);
  })
}
class Form extends Component {
  render() {
    return (
      <div>
      <div className="jumbotron text-center">
        <h1>Search page</h1>
        <p>for searhing places of interest</p>
      </div>

      <div className="row container text-center">

          <div className="col-sm-12">
             <form onSubmit={this.onSubmit}>
               <div className="form-group">
                 <label htmlFor="addr">Enter address:</label>
                 <input id="addr" name="address" className="form-control" type="text" placeholder="enter address"/>
                 <p></p>

      <label htmlFor="name">Enter name:</label>
      <input id="name" name="name" className="form-control" type="text" placeholder="enter name"/>
      <p></p>
      <label htmlFor="places-type">Please select type of place: </label>
      <p></p>
                 <select name="placetype" id="places-type"  className="form-control">
                 <option value="food" >food</option>
                 <option value="gym" >gym</option>
                 <option value="shopping_mall" >shopping_mall</option>
                 <option value="park" >park</option>

      </select>
      <p></p>
                 <input type="submit" value="Send" />
               </div>

             </form>
          </div>


      </div>
</div>
    );
  }
}

export default Form;

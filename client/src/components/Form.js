import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Result from './Result';

class Form extends Component {
  constructor(){
    super();
    this.state={
      addr: '',
      name: '',
      result: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e){

    const newQuery ={
      address: this.state.addr,
      name: this.state.name,
      placetype:this.state.placetype
    };
    e.preventDefault();
    axios.post('/getplaces',qs.stringify(newQuery))
    .then((result) =>{
       this.setState({result: result.data});
    })
    .catch((err)=>{
      console.log(err);
    })
  }
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
                 <input id="addr" name="addr" className="form-control" type="text" placeholder="enter address" value={this.state.addr}
                 onChange={this.onChange}/>
                 <p></p>

      <label htmlFor="name">Enter name:</label>
      <input id="name" name="name" className="form-control" type="text" placeholder="enter name" value={this.state.name} onChange={this.onChange}/>
      <p></p>

                 <input type="submit" value="Send" />
               </div>

             </form>
          </div>


      </div>
      <Result list={this.state.result} />
</div>
    );
  }
}

export default Form;

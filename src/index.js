import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams
} from "react-router-dom";import './index.css';
import axios from 'axios'



class Timer1 extends React.Component{
  

  render(){
    const  time  = this.props.time;
    let centiseconds = ("0" + (Math.floor(time / 100) % 10)).slice(-1);
    let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
    return <div className='timer'><h2>{this.props.name}</h2>
      {hours}:{minutes}:{seconds}:{centiseconds}0<br/>
    {this.props.clicked===false&&(<button onClick={this.props.action} >play</button>)}
    {this.props.clicked===true&&(<button onClick={this.props.action1} >stop</button>)}
    {this.props.clicked===false&&this.props.timeStart!==0&&(<button onClick={this.props.action2} >reset</button>)}


    </div>
  } 
  
  
  
}

class TotalTimer extends React.Component{
  constructor(props){
    super(props)
    this.props.f1()

  }

  render(){
  const  time  = this.props.time;
  let centiseconds = ("0" + (Math.floor(time / 100) % 10)).slice(-1);
  let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
  return <div className='timer'><h2>Total Time</h2>{hours}:{minutes}:{seconds}:{centiseconds}0</div>
  }

}



class Timer extends React.Component{
  constructor(props){
    super(props)
    this.count1 = this.count1.bind(this)
    this.stopTimer1 = this.stopTimer1.bind(this)
    this.resetTimer1 = this.resetTimer1.bind(this)

    this.count2 = this.count2.bind(this)
    this.stopTimer2 = this.stopTimer2.bind(this)
    this.resetTimer2 = this.resetTimer2.bind(this)

    this.count3 = this.count3.bind(this)
    this.stopTimer3 = this.stopTimer3.bind(this)
    this.resetTimer3 = this.resetTimer3.bind(this)


    this.state={
      clicked1:false,
      time1:0,
      timeStart1:0,
      clicked2:false,
      time2:0,
      timeStart2:0,
      clicked3:false,
      time3:0,
      timeStart3:0,
      totalTime:0

    }
  }
  count1=()=>{
    this.setState(
      {
        clicked1:true,
        time1:this.state.time1,
        timeStart1:Date.now() - this.state.time1,
      })
    this.counter =setInterval(()=>{
      if(this.state.clicked1){
        this.setState({time1:Date.now()-this.state.timeStart1})

      }
    },100)
  }

  stopTimer1=()=>{
    this.setState({clicked1:false})
    clearInterval(this.counter)
  }

  resetTimer1=()=>{
    this.setState({time1:0,timeStart1:0})

  }
  
  

  count2=()=>{
    this.setState(
      {
        clicked2:true,
        time2:this.state.time2,
        timeStart2:Date.now() - this.state.time2,
      })
    this.counter =setInterval(()=>{
      if(this.state.clicked2){
        this.setState({time2:Date.now()-this.state.timeStart2})

      }
    },1000)
  }

  stopTimer2=()=>{
    this.setState({clicked2:false})
    clearInterval(this.counter)
  }
  resetTimer2=()=>{
    this.setState({time2:0,timeStart2:0})

  }

  count3=()=>{
    this.setState(
      {
        clicked3:true,
        time3:this.state.time3,
        timeStart3:Date.now() - this.state.time3,
      })
    this.counter =setInterval(()=>{
      if(this.state.clicked3){
        this.setState({time3:Date.now()-this.state.timeStart3})

      }
    },10000)
  }

  stopTimer3=()=>{
    this.setState({clicked3:false})
    clearInterval(this.counter)
  }
  resetTimer3=()=>{
    this.setState({time3:0,timeStart3:0})

  }

  countTotal=()=>{
    this.setState(
      {
        totalTime:this.state.time1+this.state.time2+this.state.time3
      })
    this.counter =setInterval(()=>{
      
        this.setState({totalTime:this.state.time1+this.state.time2+this.state.time3})

      
    },100)
  }



  render(){
    return <div>
      <Timer1 name={'Timer1'} action={this.count1} action1={this.stopTimer1} action2={this.resetTimer1} time={this.state.time1} clicked={this.state.clicked1} timeStart={this.state.timeStart1}></Timer1>
      <Timer1 name={'Timer2'} action={this.count2} action1={this.stopTimer2} action2={this.resetTimer2} time={this.state.time2} clicked={this.state.clicked2} timeStart={this.state.timeStart2}></Timer1>
      <Timer1 name={'Timer3'} action={this.count3} action1={this.stopTimer3} action2={this.resetTimer3} time={this.state.time3} clicked={this.state.clicked3} timeStart={this.state.timeStart3}></Timer1>
      <TotalTimer f1={this.countTotal}  time={this.state.totalTime} ></TotalTimer>

  </div>
  } 
  
  
  
}

class Login extends React.Component{
  constructor(props) {
    super(props);
    

    
  }

  
  

 
render(){
 
  return <div>
          
          
          <form onSubmit={this.props.action2}>
          <label>
            name:
            <input type="text" name="name" onChange={this.props.action1} />
          </label>
          <label>
            password:
          <input type="text" name="password" onChange={this.props.action1} />
          </label>
          <input type="submit" value="Submit" />
          </form>
          
          </div>

              




}



}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={token:'?jwt=',name:'',password:''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    const res= axios.post('http://localhost:3001/login',{name:this.state.name,password:this.state.password},{headers: {
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3JpIiwiaWF0IjoxNTkzNTI5NTU5fQ.KmA6cWCSUha9UPA6_NbfxvW-15Ni6SAgXX-o2HidsM8'
     }})
     .then(response => this.setState({token:'?jwt='+response.data.accessToken})
       )
     event.preventDefault();
    }


    render(){
      
      if(this.state.token=='?jwt='){
         return <Login   name={this.state.name} password={this.state.password} token={this.state.token} action1={this.handleChange} action2={this.handleSubmit}/>
      }else{
         return <Timer/>
      }
  }
  
  }
  







ReactDOM.render(<App/>,document.getElementById('root'))

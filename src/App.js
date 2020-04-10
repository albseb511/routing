import React from 'react';
import './App.css';
import { Route, Link } from './Router/Router'

const arr = [
  {
    id: 500,
    name: "Shoes"
  },
  {
    id: 300,
    name: "Pants"
  }
]

const Home = () => <div>Home</div>

const About = () => <div>About</div>

const Contact = () => <div>Contact </div>

const Product = ({match}) => {
  return (
  <div>
    <Link to={`${match.url}/500`}>Shoes</Link>
    <br/>
    <Link to={`${match.url}/300`}>Pants</Link>
    <br/>
  </div>
  )
}
const Products = ({match}) => {
  let item = arr.find(a=>a.id==match.params.id)
  console.log(item,match)
  if(!item){
    return null
  }
  return (
  <div>
    <div>ID: {item.id}</div>
    <div>NAME: {item.name}</div>
  </div>
  )
}


function App() {
  return (
    <div className="App">
      <div>
        Navbar
        <br/>
        <Link to='/'>Home</Link>
        <br/>
        <Link to='/about'>About</Link>
        <br/>
        <Link to='/contact'>Contact</Link>
        <br/>
        <Link to='/products'>Products</Link>
      </div>
      <div>
        <Route path='/' exact component={Home} />
        <Route path='/about' render={()=><About/>} />
        <Route path='/contact'>
          <Contact />
        </Route>
        <Route path='/products' render={(props)=><Product {...props}/>} /> 
        <Route path='/products/:id' render={(props)=><Products {...props}/>} /> 
      </div>
    </div>
  );
}

export default App;

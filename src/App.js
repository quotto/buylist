import React from 'react'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import List from './List'
import BuyList from './BuyList'
import Add from './Add'
import Edit from './Edit'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={()=><List limit={20} />} />
        <Route path='/buylist' render={(props)=><BuyList {...props} />}/>
        <Route path='/add' component={Add} />
        <Route path='/edit/:id' render={(props)=><Edit {...props} />} />
      </Switch>
    </Router>
  )
}

export default App;

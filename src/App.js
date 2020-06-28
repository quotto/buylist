import React, {useEffect, useState } from 'react'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import List from './List'
import BuyList from './BuyList'
import Add from './Add'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={List} />
        <Route path='/buylist' render={(props)=><BuyList {...props} />}/>
        <Route path='/add' component={Add} />
      </Switch>
    </Router>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  menu: {  marginBottom: 15 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App;

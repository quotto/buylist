import React, {useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listMenus } from './graphql/queries'


function List(props) {
  const [menus, setMenus] = useState([])
  const [checked_flg,setChecked] = useState({})

  useEffect(()=> {
    console.log("use effect@List")
    fetchMenus()
  }, [])

  async function fetchMenus() {
    try {
      const menuData = await API.graphql(graphqlOperation(listMenus))
      const menus = menuData.data.listMenus.items
      setMenus(menus)

      const checked_flg = {}
      for(const menu of menus) {
          checked_flg[menu.id] = false
      }
      setChecked(checked_flg)
    } catch(err) { console.log(err)}
  }

  function checkMenu(event) {
      const update_checked_flg = Object.assign({},checked_flg)
      update_checked_flg[event.target.id] = event.target.checked;
      setChecked(update_checked_flg)
  }

  function gotoBuyList() {
    const targets = menus.filter(menu=>{
      return checked_flg[menu.id]
    })
    props.history.push('/buylist',{targets: targets})
  }

  function gotoAdd() {
    props.history.push('/add')
  }

  return (
    <div style={styles.container}>
      <h2>メニュー一覧</h2>
      {
        menus.map((menu, index) => (
          <div key={menu.id ? menu.id : index} style={styles.menu}>
            <input type="checkbox" id={menu.id} checked={checked_flg[menu.id]} onChange={checkMenu} style={styles.todoName} />
            <label htmlFor={menu.id} >{menu.name}</label>
          </div>
        ))
      }
      <div style={styles.footer}>
        <button onClick={gotoBuyList}>リスト</button>
        <button onClick={gotoAdd}>追加</button>
      </div>
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  menu: {  marginBottom: 15 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  footer: {width: '100%',position: 'absolute', bottom: '0'}
}

export default List;


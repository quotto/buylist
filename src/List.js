import React, {useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listMenus } from './graphql/queries'
import { Link } from 'react-router-dom'
import { Button,Checkbox } from '@material-ui/core'
import styles from './styles'


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
      <div style={styles.main}>
        <h2>メニュー一覧</h2>
        {
          menus.map((menu, index) => (
            <div key={menu.id} style={ListStyles.menu}>
              <Checkbox id={menu.id} checked={checked_flg[menu.id]} onChange={checkMenu} style={ListStyles.menuName} />
              <label htmlFor={menu.id} ><Link to={{pathname: `./edit/${menu.id}`,state: {menu: menu}}}> {menu.name}</Link></label>
            </div>
          ))
        }
      </div>
      <div style={styles.footer}>
        {/* <button style={styles.footerButton} onClick={gotoBuyList}>リスト</button> */}
        <Button style={ListStyles.footerButton} onClick={gotoBuyList} variant="contained" color="primary">リスト</Button>
        <Button style={ListStyles.footerButton} onClick={gotoAdd} variant="contained" color="primary">追加</Button>
      </div>
    </div>
  )
}


const ListStyles = {
  menu: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  menuName: { fontSize: 20, fontWeight: 'bold' },
  footerButton: { width: '40%', margin: '0 5%'}
}

export default List;


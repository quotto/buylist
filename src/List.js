import React, {useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listMenus } from './graphql/queries'
import { Link } from 'react-router-dom'
import { Button,Checkbox,TextField,InputAdornment,IconButton } from '@material-ui/core'
import ClearButton  from '@material-ui/icons/Clear'
import styles from './styles'


function List(props) {
  const [menus, setMenus] = useState([])
  const [checked_flg,setChecked] = useState({})
  const [nextToken, setNextToken] = useState(null)
  const [keywordFilter, setKeywordFilter] = useState('')
  const defaultLimit = 5

  useEffect(()=> {
    fetchMenus()
  }, [])

  async function fetchMenus() {
    try {
      const limit = props.limit ? props.limit : defaultLimit
      const menuData = await API.graphql(graphqlOperation(listMenus,{limit: limit, nextToken: nextToken}))

      const newMenus = menuData.data.listMenus.items
      const newToken = menuData.data.listMenus.nextToken
      setMenus(menus.concat(newMenus))
      setNextToken(newToken)

      const new_checked_flg = {}
      for(const menu of newMenus) {
          new_checked_flg[menu.id] = false
      }
      setChecked(Object.assign(checked_flg,new_checked_flg))
    } catch(err) { console.log(err)}
  }

  function filterByKeyword(event) {
    const keyword = event.target.value
    setKeywordFilter(keyword)
  }

  function matchFilter(value) {
    if(keywordFilter.length > 0) {
      return value.match(`.*${keywordFilter}.*`) != null
    }
    return true
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
          <TextField value={keywordFilter} onChange={filterByKeyword} label="キーワードでフィルタ" size="small" variant="outlined" InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={(e)=>{filterByKeyword({target:{value: ""}})}}><ClearButton /></IconButton>
            </InputAdornment>
          }} />
        {
          menus.map((menu, index) => (
            matchFilter(menu.name) && (
              <div key={menu.id} style={ListStyles.menu} >
                <Checkbox id={menu.id} checked={checked_flg[menu.id]} onChange={checkMenu} style={ListStyles.menuName} />
                <label htmlFor={menu.id} ><Link to={{ pathname: `./edit/${menu.id}`, state: { menu: menu } }}> {menu.name}</Link></label>
              </div>
            )
          ))
        }
        {nextToken && (
          <div style={ListStyles.loadButtonContainer}>
              <Button onClick={fetchMenus} variant="outlined" color="secondary" size="small" style={ListStyles.loadButton}>次の{props.limit ? props.limit : defaultLimit}件を表示</Button>
          </div>
        )}
      </div>
      <div style={styles.footer}>
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
  loadButtonContainer: { width: "100%",display: "flex", justifyContent: "center", flexDirection: "row" },
  loadButton: { width: "80%" },
  footerButton: { width: '40%', margin: '0 5%'}
}

export default List;


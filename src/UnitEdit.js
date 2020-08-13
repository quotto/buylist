import React,{useState,useEffect} from 'react'
import { API,graphqlOperation} from 'aws-amplify'
import { listUnits } from './graphql/queries'
import { createUnit,updateUnit,deleteUnit } from './graphql/mutations'
import { TextField, Button, IconButton, Snackbar, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import ClearButton from '@material-ui/icons/Clear'
import AddCircleButton from '@material-ui/icons/AddCircleOutline'
import styles from './styles'

function UnitEdit(props) {
    const [unitList, setUnitList] = useState([])
    const [notice, setNotice] = useState({status: 'none',message: ''})
    const [deleteList, setDeleteList] = useState([])
    useEffect(()=>{
        fetchUnitList()
    },[])
    async function fetchUnitList() {
        try {
            const result = await API.graphql(graphqlOperation(listUnits))
            const unitList = []
            console.debug(result)
            result.data.listUnits.items.forEach(unit=>{
                unit.updateValue = unit.value
            })
            setUnitList(result.data.listUnits.items)
        } catch(err) {
            console.error(err)
            setNotice({status: 'error', message: '単位リストの取得に失敗しました'})
        }
    }
    function deleteUnitInput(index) {
        const newUnitList = Object.assign([],unitList)
        const newDeleteList = Object.assign([],deleteList)
        if(unitList[index].id) {
            console.debug(`delete@${unitList[index].id}`)
            newDeleteList.push(unitList[index].id)
            setDeleteList(newDeleteList)
        }
        newUnitList.splice(index,1)
        setUnitList(newUnitList)
    }
    function addUnit(event) {
        const newUnitList = Object.assign([],unitList)
        newUnitList.push({value: "", updateValue: event.target.value})
        setUnitList(newUnitList)
    }
    function updateUnitValue(event,index) {
        const newUnitList = Object.assign([],unitList)
        newUnitList[index].updateValue = event.target.value
        setUnitList(newUnitList)
    }
    async function requestUpdate() {
        const updateList = unitList.filter(unit=>{
            return unit.updateValue && unit.value != unit.updateValue
        })
        const result = []
        updateList.forEach(unit=>{
            if(unit.id) {
                result.push(API.graphql(graphqlOperation(updateUnit,{ input: {id: unit.id,value: unit.updateValue}})))
            } else {
                result.push(API.graphql(graphqlOperation(createUnit, { input: { value: unit.updateValue } })))
            }
        })
        deleteList.forEach(id=>{
            result.push(API.graphql(graphqlOperation(deleteUnit,{ input: {id: id}})))
        })
        try {
            await Promise.all(result)
            setNotice({status: "success", message: "更新しました"})
        } catch(err) {
            console.error(err)
            setNotice({status: "error", message: "更新に失敗しました"})
        }
    }
    function backPage() {
        props.history.goBack()
    }
    return (
        <div style={styles.container}>
            <div style={styles.main}>
                <h2>単位編集</h2>
                <Snackbar open={notice.status != "none"} autoHideDuration={6000} onClose={() => { setNotice({ status: "none", message: "" }) }}>
                    <MuiAlert elevation={6} variant="filled" severity={notice.status}>{notice.message}</MuiAlert>
                </Snackbar>
                {
                    unitList.map((unit, index) => (
                        <div key={index} style={UnitStyles.unitRow}>
                            <IconButton style={UnitStyles.deleteButton} onClick={(e) => deleteUnitInput(index)} color="secondary">
                                <ClearButton />
                            </IconButton>
                            <TextField style={UnitStyles.unitInput} onChange={(e) => updateUnitValue(e, index)} value={unit.updateValue} />
                        </div>
                    ))
                }
                <div style={UnitStyles.addButton}>
                    <IconButton onClick={addUnit} color="primary">
                        <AddCircleButton />
                </IconButton>
                </div>
            </div>
            <div style={styles.footer}>
                <Button style={UnitStyles.footerButton} onClick={requestUpdate} variant="contained" color="primary" id="updateButton">更新</Button>
                <Button style={UnitStyles.footerButton} onClick={backPage} variant="contained" color="default" id="deleteButton">戻る</Button>
            </div>
        </div>
    )
}

const UnitStyles = {
  unitRow: { display: 'flex', alignItems: 'center' },
  unitInput: { padding: '0 5px', flex: '0 0 50px' },
  deleteButton: { flex: '1,0,auto'},
  addButton: {width: '100%',display: 'flex',alignItems: 'center',flexDirection: 'column'},
  footerButton: { width: '40%', margin: '0 5%'}
}

export default UnitEdit
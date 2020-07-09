
import React from 'react'
import { 
    TextField,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import ClearButton  from '@material-ui/icons/Clear'
import crypto from 'crypto'
import { sectionFooterPrimaryContent } from 'aws-amplify'

function MenuInput(props) {
    const {
        setTitle,
        setMaterials,
        setNotice,
        title,
        materials,
        notice,
    } = props
    const noticeMessage = {
        success: "登録しました",
        error: "登録に失敗しました"
    }
    function changeTitle(event) {
        setTitle(event.target.value)
    }

    function addMaterial() {
        const new_materials = Object.assign([],materials);
        new_materials.push({name: '',amount: '',unit: ''})
        setMaterials(new_materials)
    }

    function deleteMaterial(target_index) {
        const updated_materials = materials.filter((value,index)=>{
           return target_index != index 
        })
        setMaterials(updated_materials)
    }

    function updateMaterialName(event,index) {
        const updated_materials = Object.assign([],materials)
        updated_materials[index].name = event.target.value
        setMaterials(updated_materials)
    }
    function updateMaterialAmount(event,index) {
        const updated_materials = Object.assign([],materials)
        updated_materials[index].amount = event.target.value
        setMaterials(updated_materials)
    }

    function updateMaterialUnit(event,index) {
        const updated_materials = Object.assign([],materials)
        updated_materials[index].unit = event.target.value
        setMaterials(updated_materials)
    }

    return(
           <div>
               <Snackbar open={notice.status != "none"} autoHideDuration={6000} onClose={()=>{setNotice({status: "none", message: ""})}} >
                   <MuiAlert elevation={6} severity={notice.status}>{notice.message}</MuiAlert>
               </Snackbar>
               <div style={MenuStyles.menu}><TextField  value={title} onChange={changeTitle} variant='filled' label='メニューの名前' size="small"  className="title"/></div>
               <p>買うもの</p>
               {
                   materials.map((material, index) => (
                       <div style={MenuStyles.materialRow} key={index}>
                           <IconButton onClick={(e) => deleteMaterial(index)} color="secondary" style={MenuStyles.deleteButton}>
                                <ClearButton />
                           </IconButton>
                           <TextField key={`name-${index}`} value={material.name} onChange={(e) => updateMaterialName(e, index)} style={MenuStyles.materialNameInput} variant="outlined" size="small" className="inputMaterialName" label="材料" />
                           <TextField key={`amount-${index}`} value={material.amount} onChange={(e)=>updateMaterialAmount(e,index)} variant="outlined" size="small" style={MenuStyles.amountInput} className="inputAmount" label="容量"/>
                           <FormControl style={MenuStyles.unitInput}>
                               <Select value={material.unit} onChange={(e)=>updateMaterialUnit(e,index)} className="inputUnit">
                                   <MenuItem value="" />
                                   <MenuItem value="GRAM">g</MenuItem>
                                   <MenuItem value="BAG">袋</MenuItem>
                                   <MenuItem value="PACK">パック</MenuItem>
                                   <MenuItem value="NUM">個</MenuItem>
                                   <MenuItem value="STUMP">株</MenuItem>
                                   <MenuItem value="BUNCH">束</MenuItem>
                                   <MenuItem value="HON">本</MenuItem>
                                </Select>
                           </FormControl>
                        </div>
                   ))
               }
               <div style={MenuStyles.addButton}>
                   <Button onClick={addMaterial} size="small" color="secondary" variant="outlined" >追加</Button>
               </div>
           </div>
    )
}

const MenuStyles = {
  material: {  marginBottom: 15,textAlign: "center" },
  materialRow: { display: 'flex', alignItems: 'center' },
  materialNameInput: {  padding: '0 5px',flex: '3 1 50px' },
  amountInput: { padding: '0 5px',  flex: '1 0 50px' },
  unitInput: { padding: '0 5px', flex: '0 0 50px' },
  deleteButton: { flex: '1,0,auto'},
  addButton: { marginTop: 20, display: 'flex', justifyContent: 'center' }
}

export const convertToInputMaterial = (materials)=>{
    const varibale_materials = []
    for (const material of materials) {
        if (typeof (material.name) != 'undefined' && material.name.length > 0) {
            const hash = crypto.createHash('sha256').update(material.name).digest('hex')
            const pushed_material = {
                hash: hash,
                name: material.name
            }
            if (material.amount && material.unit && String(material.amount).match(/^\d+(\.{1}\d+)*$/) && material.unit.length > 0) {
                pushed_material.amount = {
                    //GraphQLのスキーマ定義はFloatであるためNumberに変換
                    value: Number(material.amount),
                    unit: material.unit
                }
            }
            varibale_materials.push(pushed_material)
        }
    }

    return varibale_materials
}

export default MenuInput
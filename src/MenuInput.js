
import React from 'react'
import { TextField,Button,IconButton,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'
import ClearButton  from '@material-ui/icons/Clear'
import crypto from 'crypto'

function MenuInput(props) {
    const {
        setTitle,
        setMaterials,
        title,
        materials,
        notice,
    } = props
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
               <p>{notice}</p>
               <div style={MenuStyles.menu}><TextField  value={title} onChange={changeTitle} variant='filled' label='メニューの名前' size="small"  className="title"/></div>
               <p>買うもの</p>
               {
                   materials.map((material, index) => (
                       <div key={index}>
                           <IconButton onClick={(e) => deleteMaterial(index)} color="secondary" style={MenuStyles.deleteButton}>
                                <ClearButton />
                           </IconButton>
                           <TextField key={`name-${index}`} value={material.name} onChange={(e) => updateMaterialName(e, index)} style={MenuStyles.materialNameInput} variant="outlined" size="small" className="inputMaterialName"/>
                           <TextField key={`amount-${index}`} value={material.amount} onChange={(e)=>updateMaterialAmount(e,index)} variant="outlined" size="small" style={MenuStyles.amountInput} className="inputAmount"/>
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
               <Button onClick={addMaterial} size="small" color="secondary" variant="outlined" style={MenuStyles.addButton}>追加</Button>
           </div>
    )
}

const MenuStyles = {
  material: {  marginBottom: 15,textAlign: "center" },
  materialNameInput: { verticalAlign: "bottom", width: "50%", marginRight: 15 },
  amountInput: {verticalAlign: "bottom",width: "20%", marginRight: 15},
  unitInput: { verticalAlign: "bottom" , width: "10%"},
  deleteButton: { verticalAlign: "bottom" },
  addButton: { marginTop: 20 }
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
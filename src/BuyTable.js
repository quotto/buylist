import React,{useEffect,useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import unit_map from './unit_map'

function BuyTable(props) {
    const [rows,setRows] = useState([])
    useEffect(()=>{
        const rows = []
        for(const menu of props.menus) {
            rows.push(
                {
                    name: menu.name,
                    checked: Object.keys(props.materials).map(material_hash => {
                        let val = ""
                        menu.materials.forEach(material=>{
                            if(material.hash === material_hash) {
                                val = "○"
                                if (material.amount && material.amount.value && material.amount.unit) {
                                    val =  `${material.amount.value}${unit_map[material.amount.unit]}`
                                }
                                return
                            }
                        })
                        return val
                    })
                }
            )
        }
        setRows(rows)
    },[props.materials])
    return (
                <TableContainer component={Paper}>
                    <Table stickyHeader arial-label="BuyTable">
                        <TableHead>
                            <TableRow className="tableHeaderRow">
                                <TableCell style={BuyTableStyles.menuNameCell}>メニュー/材料</TableCell>
                                {Object.keys(props.materials).map((hash) => (
                                    <TableCell key={hash} style={BuyTableStyles.materialNameCell} >{props.materials[hash].name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name} className="tableBodyRow">
                                    <TableCell style={BuyTableStyles.menuNameCell} component="th" scope="row">{row.name}</TableCell>
                                    {row.checked.map((check, index) => (
                                        <TableCell key={row.name + "-" + index} style={BuyTableStyles.amountCell}>{check}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    )
}

const BuyTableStyles = {
    materialNameCell:  {wordBreak:"keep-all"},
    menuNameCell:  {wordBreak:"keep-all"},
    amountCell: {wordBreak: "keep-all", textAlign: "center"}
}

export default BuyTable
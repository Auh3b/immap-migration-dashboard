
export default function premisePopup({data}:any) {
  
  const {org_pert1: implementor, org_pert2: principal} = data
  
  return (
    `<div style='display: flex; flex-direction: column; width: 150px;'>
      <p>Organización</p>
      <p>Socio Implementador: ${implementor}</p>
      <p>Socio Principal: ${principal}</p> 
    </div>`
  )
}

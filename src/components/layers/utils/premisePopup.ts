export default function premisePopup({ data }: any) {
  console.log(data);
  const {
    org_pert1: implementor,
    org_pert2: principal,
    pqr_migran: complaints,
    serv_dif_n: childrenServicesAvailability,
    serv_dif_m: womenServicesAvailability,
  } = data;

  return `<div style='display: flex; flex-direction: column; width: 150px;'>
      <p>Organización</p>
      <p>Socio Implementador: ${implementor}</p>
      <p>Socio Principal: ${principal}</p>
      <p>Servicios diferenciados para ninos: ${childrenServicesAvailability}</p>
      <p>Servicios diferenciados para mujeres: ${womenServicesAvailability}</p>
      <p>Recibe PQR migrante: ${complaints}</p>
    </div>`;
}

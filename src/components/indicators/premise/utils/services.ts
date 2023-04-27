export const SERVICES_KEY = new Map([
  [1, 'Asesoría legal'],
  [2, 'Alimentación y nutrición'],
  [3, 'Salud, primeros auxilios o atención médica'],
  [4, 'Agua potable'],
  [5, 'Saneamiento'],
  [6, 'Higiene'],
  [7, 'Transferencias monetarias'],
  [8, 'Educación'],
  [9, 'Alojamiento temporal'],
  [10, 'Información sobre la ruta'],
  [11, 'Apoyo a ayuda psicosocial'],
  [12, 'Transporte humanitario'],
  [13, 'Otro'],
]);

export const SICK_CATEGORY_ABREVATIONS = new Map([
  [1, 'Conseguir la financiación necesaria'],
  [2, 'Mejorar la capacidad de los servicios ofrecidos'],
  [3, 'Ampliar y mejorar la colaboración con otras entidades'],
  [4, 'Mejorar la visibilidad del trabajo realizado'],
  [5, 'Medir y comunicar el impacto social de los servicios prestados '],
  [6, 'Comunicación con los usuarios '],
  [7, 'Otro'],
]);

export const SERVICE_STAT_COLUMNS = new Map([
  [1, ['cap_serv_l', 'cap_serv_1', 'prom_legal']],
  [2, ['tipo_alime', 'pers_alim', 'prom_pers_']],
  [3, ['pers_atien', 'serv_sal_1', 'prom_serv_']],
  [4, ['prom_agua_', 'serv_agua', 'prom_agua1']],
  [5, ['serv_san_d', 'serv_san_a', 'prom_serv1']],
  [6, ['serv_hig_d', 'serv_hig_a', 'prom_ser_h']],
  [7, ['serv_tra_2']],
  [8, ['serv_edu_d', 'serv_edu_a', 'prom_ser_1']],
  [9, ['serv_aloj', 'serv_aloj_', 'serv_aloj1']],
  [10, ['serv_ruta_', 'serv_ruta1', 'prom_ser_2']],
  [11, ['serv_psico', 'serv_psi_1', 'prom_ser_3']],
  [12, ['serv_trans', 'serv_tra_1', 'prom_ser_4']],
  [13, ['serv_tra_2', 'atend_serv', 'atend_ser_']],
]);

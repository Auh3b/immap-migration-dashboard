export const SERVICES_KEY = new Map([
  [1, 'Asesoría legal'],
  [2, 'Alimentación y nutrición'],
  [3, 'Salud, primeros auxilios o atención médica'],
  [4, 'Agua potable'],
  [5, 'Saneamiento'],
  [6, 'Higiene'],
  [8, 'Educación'],
  [9, 'Alojamiento temporal'],
  [10, 'Información sobre la ruta'],
  [11, 'Apoyo o ayuda psicosocial'],
  [12, 'Transporte humanitario'],
  [13, 'Otro'],
  [14, 'Servicios de protección'],
  [15, 'Servicios de protección NNA'],
  [16, 'Restablecimiento de contacto familiar'],
  [17, 'Gestión de casos'],
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

// [daily capacity, yesterday count, daily average ]

export const SERVICE_STAT_COLUMNS = new Map([
  [1, ['cap_serv_l', 'cap_serv_1']],
  [2, ['tipo_alime', 'pers_alim']],
  [3, ['pers_atien', 'serv_sal_1']],
  [4, ['prom_agua_', 'serv_agua']],
  [5, ['serv_san_d', 'serv_san_a']],
  [6, ['serv_hig_d', 'serv_hig_a']],
  [7, ['serv_tra_2']],
  [8, ['serv_edu_d', 'serv_edu_a']],
  [9, ['serv_aloj', 'serv_aloj_']],
  [10, ['serv_ruta_', 'serv_ruta1']],
  [11, ['serv_psico', 'serv_psi_1']],
  [12, ['serv_trans', 'serv_tra_1']],
  [13, ['serv_tra_2', 'atend_serv']],
  [14, ['serv_tra_2', 'atend_serv']],
  [15, ['serv_tra_2', 'atend_serv']],
  [16, ['serv_tra_2', 'atend_serv']],
  [17, ['serv_tra_2', 'atend_serv']],
]);

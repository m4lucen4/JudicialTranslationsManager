export const userInputs = [
  {
    id: "displayName",
    label: "Denominación",
    type: "text",
    placeholder: "Juzgado de Primera Instancia e Ins....",
  },
  {
    id: "email",
    label: "Correo electrónico",
    type: "mail",
    placeholder: "ejemplo@ejemplo.com",
  },
  {
    id: "userType",
    label: "Tipo de usuario",
    type: "select",
    options: [
      { value: "SuperUsuario", label: "SuperUsuario" },
      { value: "Usuario", label: "Usuario" }
    ],
    placeholder: "Selecciona un tipo",
  },
  {
    id: "password",
    label: "Contraseña",
    type: "password",
  },
  {
    id: "address",
    label: "Dirección",
    type: "text",
    placeholder: "La dirección es...",
  },
  {
    id: "phone",
    label: "Teléfono de contacto",
    type: "text",
    placeholder: "123 456 789",
  },
  {
    id: "county",
    label: "Municipio",
    type: "text",
    placeholder: "Málaga",
  }
];

export const fileInputs = [
  {
    id: "oojjName",
    label: "Órgano",
    type: "text",
    disabled: true,
  },
  {
    id: "description",
    label: "Descripción",
    type: "text",
    placeholder: "Nombre del procedimiento",
  },
  {
    id: "date",
    label: "Fecha del procedimiento",
    type: "text",
  },
  {
    id: "userType",
    label: "Tipo de procedimiento",
    type: "select",
    options: [
      { value: "traduccion", label: "Traducción" },
      { value: "interpretacion", label: "Interpretación" },
      { value: "ratificacion", label: "Ratificación" }
    ],
    placeholder: "Selecciona un tipo",
  },
  {
    id: "state",
    label: "Estado",
    type: "select",
    options: [
      { value: "pendiente", label: "Pendiente" },
      { value: "encurso", label: "En curso" },
      { value: "pendientedefacturar", label: "Pendiente de facturar" },
      { value: "suspendido", label: "Suspendido" },
      { value: "facturado", label: "Facturado" }
    ],
  },
  {
    id: "originLanguage",
    label: "Idioma origen",
    type: "select",
    options: [
      { value: "espanol", label: "Español" },
      { value: "ingles", label: "Inglés" },
      { value: "frances", label: "Frances" },
      { value: "aleman", label: "Alemán" },
      { value: "italiano", label: "Italiano" }
    ],
  },
  {
    id: "destinyLanguage",
    label: "Idioma destino",
    type: "select",
    options: [
      { value: "espanol", label: "Español" },
      { value: "ingles", label: "Inglés" },
      { value: "frances", label: "Frances" },
      { value: "aleman", label: "Alemán" },
      { value: "italiano", label: "Italiano" }
    ],
  },
  {
    id: "address",
    label: "Dirección",
    type: "text",
    placeholder: "La dirección es...",
  },
  {
    id: "phone",
    label: "Teléfono de contacto",
    type: "text",
    placeholder: "123 456 789",
  },
  {
    id: "observations",
    label: "Observaciones",
    type: "text",
    placeholder: "Observaciones",
  },
  // {
  //   id: "attachment",
  //   label: "Documento",
  //   type: "text",
  //   placeholder: "Observaciones",
  // }
];
  
  export const productInputs = [
    {
      id: 1,
      label: "Title",
      type: "text",
      placeholder: "Apple Macbook Pro",
    },
    {
      id: 2,
      label: "Description",
      type: "text",
      placeholder: "Description",
    },
    {
      id: 3,
      label: "Category",
      type: "text",
      placeholder: "Computers",
    },
    {
      id: 4,
      label: "Price",
      type: "text",
      placeholder: "100",
    },
    {
      id: 5,
      label: "Stock",
      type: "text",
      placeholder: "in stock",
    },
  ];
  
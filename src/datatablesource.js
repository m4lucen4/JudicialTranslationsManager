export const userColumns = [
  // {
  //   field: "user",
  //   headerName: "Usuario",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.img} alt="avatar" />
  //         {params.row.displayName}
  //       </div>
  //     );
  //   },
  // },
  {
    field: "displayName",
    headerName: "Usuario",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "address",
    headerName: "Dirección",
    width: 250,
  },
  {
    field: "userType",
    headerName: "Tipo de usuario",
    width: 150,
  },
];

export const filesColumns = [
  {
    field: "oojjName",
    headerName: "Órgano",
    width: 230,
  },
  {
    field: "createdAt",
    headerName: "Fecha del registro",
    width: 250,
  },
  {
    field: "description",
    headerName: "Descripción",
    width: 200,
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 200,
  },
  {
    field: "state",
    headerName: "Estado",
    width: 150,
  },
  {
    field: "img",
    headerName: "Documento",
    width: 150,
  },
]

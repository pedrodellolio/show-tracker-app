import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import getShowStatusColor from "../utils/showStatusColor";
import useUserShow from "../hooks/useUserShow";
import formatShowsGrid from "../utils/formatShowsGrid";
import RowOptions from "../components/RowOptions";
import useColorMode from "../hooks/useColorMode";

function MoviesDataGrid() {
  const { shows, loading } = useUserShow();
  const { themeMode } = useColorMode();

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Name", disableColumnMenu: true, width: 300 },
    {
      field: "col2",
      headerName: "Current Episode",
      disableColumnMenu: true,
      width: 150,
    },
    {
      field: "col3",
      headerName: "Current Season",
      disableColumnMenu: true,
      width: 150,
    },
    {
      field: "col4",
      headerName: "Status",
      disableColumnMenu: true,
      width: 150,
      renderCell: (params) => {
        const { bgColor, color } = getShowStatusColor(
          params.value as string,
          themeMode
        );
        return (
          <Chip
            label={params.value}
            style={{ backgroundColor: bgColor, color }}
          />
        );
      },
    },
    { field: "col5", headerName: "Type", disableColumnMenu: true, width: 150 },
    { field: "col6", headerName: "Score", disableColumnMenu: true, width: 150 },
    // {
    //   field: "col7",
    //   headerName: "Start Year",
    //   disableColumnMenu: true,
    //   width: 150,
    // },
    // {
    //   field: "col8",
    //   headerName: "End Year",
    //   disableColumnMenu: true,
    //   width: 150,
    // },
    {
      field: "options",
      headerName: "",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 150,
      renderCell: (params) => {
        return <RowOptions rowId={params.row.id} />;
      },
    },
  ];

  return (
    <div>
      {!loading ? (
        <DataGrid rows={formatShowsGrid(shows)} columns={columns} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MoviesDataGrid;

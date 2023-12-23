import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import getShowStatusColor from "../utils/showStatusColor";
import useUserShow from "../hooks/useUserShow";
import formatShowsGrid from "../utils/formatShowsGrid";

const columns: GridColDef[] = [
  { field: "col1", headerName: "Name", width: 150 },
  { field: "col2", headerName: "Current Episode", width: 150 },
  { field: "col3", headerName: "Current Season", width: 150 },
  {
    field: "col4",
    headerName: "Status",
    width: 150,
    renderCell(params) {
      const { bgColor, color } = getShowStatusColor(params.value as string);
      return (
        <Chip
          label={params.value}
          style={{ backgroundColor: bgColor, color }}
        />
      );
    },
  },
  { field: "col5", headerName: "Type", width: 150 },
  { field: "col6", headerName: "Score", width: 150 },
  { field: "col7", headerName: "Start Year", width: 150 },
  { field: "col8", headerName: "End Year", width: 150 },
];

function MoviesDataGrid() {
  const { shows, loading } = useUserShow();
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

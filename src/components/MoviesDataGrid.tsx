import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { Box, Chip, Rating, Typography } from "@mui/material";
import getShowStatusColor from "../utils/showStatusColor";
import { formatShowsGrid } from "../utils/formatShowsGrid";
import RowOptions from "../components/RowOptions";
import useColorMode from "../hooks/useColorMode";
import { UserShow } from "../models/UserShow";

interface Props {
  userUID: string;
  data: UserShow[];
  loading: boolean;
  removable: boolean;
}

function MoviesDataGrid(props: Props) {
  const { themeMode } = useColorMode();

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "Title",
      disableColumnMenu: true,
      width: 250,
    },
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
    {
      field: "col5",
      headerName: "Type",
      disableColumnMenu: true,
    },
    {
      field: "col6",
      headerName: "Rating",
      disableColumnMenu: true,
      width: 160,
      renderCell: (params) => {
        return <Rating readOnly value={params.value} size="small" />;
      },
    },
    {
      field: "options",
      headerName: "",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          props.removable && (
            <RowOptions userUID={props.userUID} rowId={params.row.id} />
          )
        );
      },
    },
  ];

  return (
    <div>
      {!props.loading ? (
        <DataGrid
          rows={props.data ? formatShowsGrid(props.data) : []}
          columns={columns}
          autoHeight
          sx={{
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
              {
                outline: "none",
              },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
              {
                outline: "none",
              },
          }}
          slots={{
            noRowsOverlay: () => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body1" textAlign={"center"}>
                  No shows added yet.
                </Typography>
              </Box>
            ),
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MoviesDataGrid;

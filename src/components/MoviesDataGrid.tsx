import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip, Typography } from "@mui/material";
import getShowStatusColor from "../utils/showStatusColor";
import formatShowsGrid from "../utils/formatShowsGrid";
import RowOptions from "../components/RowOptions";
import useColorMode from "../hooks/useColorMode";
import { Show } from "../models/Show";

interface Props {
  userUID: string;
  data: Show[];
  loading: boolean;
}

function MoviesDataGrid(props: Props) {
  const { themeMode } = useColorMode();

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "Name",
      disableColumnMenu: true,
      width: 250
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
      // width: 150,
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
      //  width: 150
    },
    {
      field: "col6",
      headerName: "Score",
      disableColumnMenu: true,
      // width: 150
    },
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
      // width: 150,
      renderCell: (params) => {
        return <RowOptions userUID={props.userUID} rowId={params.row.id} />;
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

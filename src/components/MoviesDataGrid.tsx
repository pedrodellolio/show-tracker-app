import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip, Typography } from "@mui/material";
import getShowStatusColor from "../utils/showStatusColor";
import useUserShow from "../hooks/useUserShow";
import formatShowsGrid from "../utils/formatShowsGrid";
import RowOptions from "../components/RowOptions";
import useColorMode from "../hooks/useColorMode";
import useAuth from "../hooks/useAuth";

interface Props {
  userUID: string | null;
}

function MoviesDataGrid(props: Props) {
  const { user } = useAuth();
  const uid = props.userUID ?? user!.uid;
  const { shows, loading } = useUserShow(uid);
  const { themeMode } = useColorMode();

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "Name",
      disableColumnMenu: true,
      // width: 300
    },
    {
      field: "col2",
      headerName: "Current Episode",
      disableColumnMenu: true,
      // width: 150,
    },
    {
      field: "col3",
      headerName: "Current Season",
      disableColumnMenu: true,
      // width: 150,
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
        return <RowOptions userUID={uid} rowId={params.row.id} />;
      },
    },
  ];

  return (
    <div>
      {!loading ? (
        <DataGrid
          rows={formatShowsGrid(shows)}
          columns={columns}
          autoHeight
          slots={{
            noRowsOverlay: () => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2
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

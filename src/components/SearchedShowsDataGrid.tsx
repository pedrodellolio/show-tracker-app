import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { formatSearchedShowsGrid } from "../utils/formatShowsGrid";
import { Show } from "../models/Show";

interface Props {
  data: Show[];
  loading: boolean;
  selectedRow: Show | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<Show | null>>;
}

function SearchedShowsDataGrid(props: Props) {
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "",
      disableColumnMenu: true,
      width: 320,
    },
    {
      field: "releaseYear",
      headerName: "",
      disableColumnMenu: true,
    },
    {
      field: "releaseDate",
      headerName: "",
      disableColumnMenu: true,
    },
  ];

  return (
    <div>
      {!props.loading ? (
        <DataGrid
          rows={formatSearchedShowsGrid(props.data)}
          columns={columns}
          autoHeight
          hideFooterSelectedRowCount
          columnHeaderHeight={0}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5]}
          onRowClick={(params) => {
            props.setSelectedRow({
              title: params.row.title,
              release_date: params.row.releaseDate,
            } as Show);
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
                  No shows found.
                </Typography>
              </Box>
            ),
          }}
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
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SearchedShowsDataGrid;

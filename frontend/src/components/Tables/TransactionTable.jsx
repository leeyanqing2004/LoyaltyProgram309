import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, TablePagination
} from "@mui/material";
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useState } from "react";
import styles from "./TransactionTable.module.css"
  
export default function TransactionTable({ transTableTitle, includeManageButton }) {
    // this is make a fake table with 50 rows, just to see
    const rows = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        utorid: `[Utorid Here]`,
        type: `[e.g. purchase]`,
        spent: (Math.random() * 100).toFixed(2),
        earned: (Math.random() * 100).toFixed(2),
        remark: "[remark here]",
        promotionIds: "[e.g. [42]]",
        createdBy: "[createdBy utorid here]"
    }));
  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
  
    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const processedRows = rows
    // FILTER
    .filter((row) =>
        row.utorid.toLowerCase().includes(filter.toLowerCase())
    )
    // SORT
    .sort((a, b) => {
        if (!sortBy) return 0;
        if (sortBy === "id") return a.id - b.id;
        if (sortBy === "earned") return a.earned - b.earned;
        if (sortBy === "spent") return a.spent - b.spent;
        if (sortBy === "utorid") return a.utorid.localeCompare(b.utorid);
        return 0;
    });
  
    return (
        <div className={styles.transactionTableContainer}>
            <div className={styles.transactionTableTitle}>{transTableTitle}</div>
            <Box display="flex" gap={2} mb={2}>
                {/* Filter Input */}
                <TextField
                    label="Filter by Utorid"
                    variant="outlined"
                    size="small"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />

                {/* Sort Dropdown */}
                <FormControl size="small">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ minWidth: 150 }}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="earned">Points Earned</MenuItem>
                        <MenuItem value="spent">Points Spent</MenuItem>
                        <MenuItem value="utorid">Utorid</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Paper>
                <TableContainer>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell>Remark</TableCell>
                        <TableCell>Promotions Applied</TableCell>
                        <TableCell>Created By</TableCell>
                        <TableCell>Additional Details</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
        
                    <TableBody>
                    {processedRows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.utorid}</TableCell>
                            <TableCell>{row.earned}</TableCell>
                            <TableCell>{row.remark}</TableCell>
                            <TableCell>{row.promotionIds}</TableCell>
                            <TableCell>{row.createdBy}</TableCell>
                            <TableCell>Additional Info Here</TableCell>
                            <TableCell> {includeManageButton ? <button>Manage Transaction</button> : null} </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
        
                <TablePagination
                component="div"
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
  
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, TablePagination
} from "@mui/material";
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useState } from "react";
import styles from "./UserTable.module.css"
  
export default function UserTable({ userTableTitle }) {
    // this is make a fake table with 50 rows, just to see
    const rows = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        utorid: "[e.g. johndoe1]",
        name: "[e.g. John Doe]",
        email: "[e.g. john@gmail.com]",
        birthday: "[e.g. 2000-01-01]",
        role: "[e.g. regular]",
        points: "[e.g. 0]",
        createdAt: "[e.g. Dec. 10, 2025]",
        lastLogin: "[e.g. Dec 11, 2025]",
        verified: "[e.g. false]",
        avatarUrl: "[e.g. avatar.jpeg]"
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
        row.name.toLowerCase().includes(filter.toLowerCase())
    )
    // SORT
    .sort((a, b) => {
        if (!sortBy) return 0;
        if (sortBy === "id") return a.id - b.id;
        if (sortBy === "points") return a.points - b.points;
        if (sortBy === "utorid") return a.utorid.localeCompare(b.utorid);
        if (sortBy === "role") return a.role.localeCompare(b.role);
        return 0;
    });
  
    return (
        <div className={styles.userTableContainer}>
            <div className={styles.userTableTitle}>{userTableTitle}</div>
            <Box display="flex" gap={2} mb={2}>
                {/* Filter Input */}
                <TextField
                    label="Filter by UTORid"
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
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="type">Type</MenuItem>
                        <MenuItem value="minSpending">Minimum Spending</MenuItem>
                        <MenuItem value="points">Points</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Paper>
                <TableContainer>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Birthday</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell>Verified</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Last Login</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
        
                    <TableBody>
                    {processedRows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.birthday}</TableCell>
                            <TableCell>{row.points}</TableCell>
                            <TableCell>{row.verified}</TableCell>
                            <TableCell>{row.createdAt}</TableCell>
                            <TableCell>{row.lastLogin}</TableCell>
                            <TableCell> <button className={styles.moreDetailsBtn} >Manage User</button> </TableCell>
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
  
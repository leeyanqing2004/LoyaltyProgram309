import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from "@mui/material";
import { TextField, Box } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../api/api";
import styles from "./UserTable.module.css";
import PanelActionButton from "../Buttons/PanelActionButton";

export default function UserSearchTable() {
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [nameFilter, setNameFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const params = {
                    page: page + 1,
                    limit: rowsPerPage,
                };

                if (nameFilter.trim()) {
                    params.name = nameFilter.trim();
                }

                const response = await api.get("/users", { params });
                setRows(response.data.results || []);
                setTotalCount(response.data.count || 0);
            } catch (err) {
                console.error(err);
                setRows([]);
                setTotalCount(0);
            }
        };
        fetchUsers();
    }, [page, rowsPerPage, nameFilter]);

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return (
        <div className={styles.userTableContainer}>
            <div className={styles.userTableTitle}>User Search</div>
            <Box display="flex" flexDirection="column" gap={1} mb={2}>
                <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={nameFilter}
                    onChange={(e) => {
                        setNameFilter(e.target.value);
                        setPage(0);
                    }}
                    placeholder="Search by name or utorid"
                    fullWidth
                />
            </Box>

            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Utorid</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Points</TableCell>
                                <TableCell>Verified</TableCell>
                                <TableCell>Promotions Available</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.utorid}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.points}</TableCell>
                                    <TableCell>
                                        {row.verified ? "Yes" : "n/a"}
                                    </TableCell>
                                    <TableCell>n/a</TableCell>
                                    <TableCell>
                                        <PanelActionButton
                                            label="Process Redemption"
                                            onClick={() => {}}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <PanelActionButton
                                            label="Create Purchase"
                                            onClick={() => {}}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={totalCount}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}



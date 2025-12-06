const express = require("express");
const { expressjwt: jwtMiddleware } = require('express-jwt');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// ✔ Correct Port Handling for Render
const port = process.env.PORT || 3000;

// CORS
// Allow local dev plus any comma-separated FRONTEND_URL entries (e.g., your Vercel deploy URLs).
// If FRONTEND_URL is not set, default to allowing all origins to avoid accidental lockouts.
const FRONTEND_URL = process.env.FRONTEND_URL || "";
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ...FRONTEND_URL.split(",").map((o) => o.trim()).filter(Boolean),
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow server-to-server / curl (no origin) and allow-all fallback
        if (!origin || allowedOrigins.length === 0) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        console.warn(`Blocked CORS origin: ${origin}. Allowed: ${allowedOrigins.join(", ")}`);
        return callback(new Error("Not allowed by CORS"));
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

// JWT middleware
app.use(
    jwtMiddleware({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256']
    }).unless({
        path: [
            '/auth/tokens',
            '/auth/resets',
            '/users/new',
            { url: /^\/auth\/resets\/.*/, methods: ['POST'] }
        ]
    })
);

// Routers
app.use('/users', require('./routers/users'));
app.use('/auth', require('./routers/auth'));
app.use('/promotions', require('./routers/promotions'));
app.use('/events', require('./routers/events'));
app.use('/transactions', require('./routers/transactions'));
app.use('/raffles', require('./routers/raffles'));

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    console.error(`cannot start server: ${err.message}`);
    process.exit(1);
});

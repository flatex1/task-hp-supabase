import { serve, Context } from "bun";
import { addBooking } from './controllers/bookingController';
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = join(__dirname, 'public');
const viewsPath = join(__dirname, 'views');

console.log('Starting server setup...');

serve({
    port: 3005,
    async fetch(req) {
        const url = new URL(req.url);

        console.log(`Received request: ${req.method} ${url.pathname}`);

        
        if (req.method === "GET" && url.pathname.startsWith("/assets")) {
            const filePath = join(publicPath, url.pathname);
            try {
                const file = readFileSync(filePath);
                return new Response(file, {
                    headers: { "Content-Type": getMimeType(filePath) }
                });
            } catch (e) {
                console.error(`File not found: ${filePath}`);
                return new Response("File not found", { status: 404 });
            }
        }

        // Обработка favicon
        // if (req.method === "GET" && url.pathname === "/favicon.ico") {
        //     const filePath = join(publicPath, 'assets', 'img', 'favicon.ico');
        //     try {
        //         const file = readFileSync(filePath);
        //         return new Response(file, {
        //             headers: { "Content-Type": "image/x-icon" }
        //         });
        //     } catch (e) {
        //         console.error(`File not found: ${filePath}`);
        //         return new Response("File not found", { status: 404 });
        //     }
        // }

        if (req.method === "POST" && url.pathname === "/bookings") {
            const ctx: Context = { request: req };  // Создаем объект типа Context
            return addBooking(ctx);
        }

        // Возвращаем HTML файл для остальных маршрутов
        if (req.method === "GET" && url.pathname === "/") {
            const filePath = join(viewsPath, 'index.html');
            try {
                const file = readFileSync(filePath);
                return new Response(file, {
                    headers: { "Content-Type": "text/html" }
                });
            } catch (e) {
                console.error(`File not found: ${filePath}`);
                return new Response("File not found", { status: 404 });
            }
        }

        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Server running at http://localhost:3005`);

function getMimeType(filePath: string): string {
    const extension = filePath.split('.').pop();
    switch (extension) {
        case 'css': return 'text/css';
        case 'js': return 'application/javascript';
        case 'png': return 'image/png';
        case 'jpg': return 'image/jpeg';
        case 'jpeg': return 'image/jpeg';
        case 'gif': return 'image/gif';
        case 'svg': return 'image/svg+xml';
        case 'html': return 'text/html';
        default: return 'application/octet-stream';
    }
}

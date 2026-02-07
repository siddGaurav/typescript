import http from 'http';
import cluster from 'cluster';
import os from 'os';
import app from './app.js';
import './model/allmodel.js';

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
    const numCPUs = os.cpus().length;
    console.log(numCPUs);
    if (cluster.isPrimary) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker) => {
            console.log(`Worker ${worker.process.pid} died. Restarting...`);
            cluster.fork();
        });
    }
    else {
        (async () => {
            const PORT: any = process.env.PORT || 8080;
            const HOST: string = process.env.HOST || 'localhost';
            const server = http.createServer(app);
            server.listen(PORT, function () {
                console.log(`Server started http://localhost:${PORT}`);
            })
        })();
    }
}
else {
    (async () => {
        const PORT: any = process.env.PORT || 8080;
        const HOST: string = process.env.HOST || 'localhost';
        const server = http.createServer(app);
        server.listen(PORT, function () {
            console.log(`Server started http://localhost:${PORT}`);
        })
    })();
}









declare module "bun" {
    export interface Context {
        request: Request;
    }

    export function serve(options: {
        port: number;
        fetch: (req: Request) => Response | Promise<Response>;
    }): void;
}
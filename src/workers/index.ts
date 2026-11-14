import { CypherWorkerRPC } from "./cypher.worker"

export namespace Workers {
    export function Cypher() {
        return CypherWorkerRPC.wrap(() => {
            return new Worker(new URL("@workers/cypher.worker.ts", import.meta.url))
        })
    }
}
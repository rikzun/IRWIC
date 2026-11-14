import * as Comlink from "comlink"
import { WorkerLib } from "@workers/lib"
import { CypherService } from "../cypher/cypher.service"

export class CypherWorkerRPC extends WorkerLib.RPC {
    async encrypt(keyword: string, input: string) {
        return await CypherService.encrypt(keyword, input)
    }

    async decrypt(keyword: string, input: string) {
        return await CypherService.decrypt(keyword, input)
    }
}

Comlink.expose(new CypherWorkerRPC(true))
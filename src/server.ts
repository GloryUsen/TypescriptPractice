import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";

import { schema } from "./schema.ts";

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(4000, () => {
    console.log("🚀 GraphQL running at http://localhost:4000/graphql");
});
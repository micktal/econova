import serverless from "serverless-http";
import expressApp from "../../dist/server/node-build.mjs";

export const handler = serverless(expressApp);

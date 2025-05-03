// // lib/withSession.js
// import { getIronSession } from "iron-session";
// import { sessionOptions } from "./session";

// export async function withSession(handler) {
//   return async (req) => {
//     const session = await getIronSession(req, {
//       cookies: req.cookies,
//       ...sessionOptions,
//     });

//     req.session = session;

//     const res = await handler(req);
//     return res;
//   };
// }

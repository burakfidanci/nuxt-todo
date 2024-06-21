import { JsonDB } from "~/server/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") ?? "";
  const body = await readBody(event);
  const secret = useRuntimeConfig().public.dbSecret;
  const db = new JsonDB(secret);
  return db.updateTodo(id, body);
});

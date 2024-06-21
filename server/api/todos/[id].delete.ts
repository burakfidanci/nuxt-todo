import { JsonDB } from "~/server/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") ?? "";
  const secret = useRuntimeConfig().public.dbSecret;
  const db = new JsonDB(secret);
  return db.deleteTodo(id);
});

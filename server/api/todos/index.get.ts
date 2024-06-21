import { JsonDB } from "~/server/db";

export default defineEventHandler(async (event) => {
  const secret = useRuntimeConfig().public.dbSecret;
  const db = new JsonDB(secret);
  return db.getAllTodos();
});

import { JsonDB } from "~/server/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const secret = useRuntimeConfig().public.dbSecret;
  const db = new JsonDB(secret);
  return db.createTodo({ title: body.title, completed: body.completed });
});

import { JsonDB } from "~/server/db";
import { defineEventHandler, H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const secret = useRuntimeConfig().public.dbSecret;

  try {
    const db = new JsonDB(secret);
    const todos = db.getAllTodos();
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "An error occurred while fetching todos",
    });
  }
});

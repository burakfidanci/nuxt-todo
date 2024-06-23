import { JsonDB } from "~/server/db";
import { defineEventHandler, getRouterParam, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const id = getRouterParam(event, "id");
  const secret = useRuntimeConfig().public.dbSecret;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Todo ID is required",
    });
  }

  try {
    const db = new JsonDB(secret);
    const isDeleted = db.deleteTodo(id);

    if (!isDeleted) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Todo not found or already deleted",
      });
    }

    return {
      status: true,
      message: "Todo deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting todo:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "An error occurred while deleting the todo",
    });
  }
});

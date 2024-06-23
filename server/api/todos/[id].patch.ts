import { JsonDB } from "~/server/db";
import { defineEventHandler, getRouterParam, readBody, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const secret = useRuntimeConfig().public.dbSecret;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Todo ID is required',
    });
  }

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Request body is required and must be an object',
    });
  }

  try {
    const db = new JsonDB(secret);
    const updatedTodo = db.updateTodo(id, body);

    if (!updatedTodo) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: 'Todo not found',
      });
    }

    return {
      status: true,
      data: updatedTodo,
      message: 'Todo updated successfully',
    };
  } catch (error) {
    console.error("Error updating todo:", error);

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'An error occurred while updating the todo',
    });
  }
});
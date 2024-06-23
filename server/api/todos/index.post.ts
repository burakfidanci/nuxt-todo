import { JsonDB } from "~/server/db";
import { Priority, TodoInsertOrUpdateItem, TodoInsertResponse } from "~/types/todo";
import { defineEventHandler, readBody, H3Event, createError } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody<TodoInsertOrUpdateItem>(event);
    const secret = useRuntimeConfig().public.dbSecret;

    if (!body || !body.title || typeof body.title !== "string") {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Title is required and must be a string",
      });
    }

    const db = new JsonDB(secret);
    const newTodo: TodoInsertResponse = db.createTodo({
      completed: body.completed ?? false,
      priority: body.priority ?? Priority.Normal,
      title: body.title,
    });

    return {
      status: true,
      data: newTodo,
      message: "Todo created successfully",
    };
  } catch (error) {
    console.error("Error creating todo:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "An error occurred while creating the todo",
    });
  }
});

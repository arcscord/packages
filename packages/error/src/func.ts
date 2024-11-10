import type { Result, ResultErr, ResultOk } from "./type";
import { anyToError } from "./util";

/**
 * Wraps a value in a Result with a success status.
 *
 * @param value - The value to be wrapped.
 * @returns The Result object with success status and wrapped value.
 * @template T - The type of value to be wrapped.
 */
export function ok<T>(value: T): ResultOk<T> {
  return [value, null];
}

/**
 * Creates an error result.
 *
 * @param err - The error value.
 * @returns The error result.
 * @template E - The type of the error.
 */
export function error<E extends Error>(err: E): ResultErr<E> {
  return [null, err];
}

/**
 * Executes a given function and returns a Result wrapping the result or an error.
 *
 * @param fn - The function to be executed.
 * @returns A promise that resolves to a Result.
 * @template T - The type of the result value.
 */
export async function forceSafe<T>(fn: (...args: unknown[]) => T | Promise<T>): Promise<Result<T, Error>> {
  try {
    const result = await fn();
    return ok(result);
  }
  catch (e) {
    return error(anyToError(e));
  }
}
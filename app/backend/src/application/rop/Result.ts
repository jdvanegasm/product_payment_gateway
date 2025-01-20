export type Result<T, E> = Success<T> | Failure<E>;

class Success<T> {
  readonly isSuccess = true;
  constructor(public readonly value: T) {}
}

class Failure<E> {
  readonly isSuccess = false;
  constructor(public readonly error: E) {}
}

export const success = <T>(value: T): Result<T, never> => new Success(value);
export const failure = <E>(error: E): Result<never, E> => new Failure(error);
export const isFailure = <T, E>(result: Result<T, E>): result is Failure<E> => {
  return !result.isSuccess;
};
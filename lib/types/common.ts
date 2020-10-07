export interface CanvasError {
  isError: boolean;
  message?: string;
}

export type Optional<T> = T | null | undefined;
export type OptionalPromise<T> = Promise<Optional<T>>;

export interface JWTPayload {
  userId: string;
  email: string;
  sessionId: string;
  type: 'AUTHORIZATION' | 'REFRESH';
  createdAt: number;
  expiresIn: number;
}

export class CanvasV2Error<T> extends Error {
  public status: number;

  public errors?: T;

  constructor(args: { status: number; errors?: T; message: string }) {
    super(args.message);

    Object.defineProperty(this, 'message', {
      get() {
        return args.message;
      },
    });

    Object.defineProperties(this, {
      errors: {
        get: () => args.errors,
      },
      message: {
        get: () => args.message,
      },
      status: {
        get: () => args.status,
      },
    });

    Error.captureStackTrace(this, CanvasV2Error);

    return this;
  }
}

export type BaseType = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

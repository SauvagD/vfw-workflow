export type DeepNullable<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? Array<U | null> | null
      : DeepNullable<T[K]> | null
    : T[K] | null
}

export type DeepNullableBut<T, K extends keyof T> = {
  [P in keyof T]: P extends K
    ? NonNullable<T[P]> extends object
      ? DeepNullable<NonNullable<T[P]>>
      : NonNullable<T[P]>
    : T[P] extends object
      ? T[P] extends Array<infer U>
        ? Array<U | null> | null
        : DeepNullable<T[P]> | null
      : T[P] | null
}

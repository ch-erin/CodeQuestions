// 保留
type MyExtract<T, U> = T extends U ? T : never;
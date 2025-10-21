// 排除
type MyExclude<T, U> = T extends U ? never : T;

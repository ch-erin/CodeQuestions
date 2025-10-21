type Equal<A, B> =
    [A] extends [B] ?
    [B] extends [A] ? true : false :
    false;

// 检查 A是不是属于B,B是不是属于A


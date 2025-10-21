// 可选
type MyPartial<T> = {
    [P in keyof T]?: T[P];
};

// 嵌套版本_可选
type MyPartial_Dfs<T> = {
    [P in keyof T]?:
    T[P] extends object ? MyPartial<T[P]> : T[P];
};

interface Address {
    street: string;
    city: string;
    zipCode: string;
}

interface User {
    name: string;
    age: number;
    address: Address;
    contact: {
        phone: string;
        emergency: {
            name: string;
            relation: string;
        }
    }
}
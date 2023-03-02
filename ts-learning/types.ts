const unionArrObj: UnionType[] = [
  { pos: 1, neg: 2 },
  { posneg: 3 },
  { pos: 4, neg: 5 },
];

Object.entries(unionArrObj).forEach(([key, value]) => {
  // value is of type CompundType
  // key is of type string
});

type SomeKeys = "A" | "B";
type SomeRecord = Partial<Record<SomeKeys, number>>;

const someRecord: SomeRecord[] = [{ A: 1, B: 2 }, { B: 4 }];

Object.entries(someRecord).forEach(([key, value]) => {
  // key is of type string
  // value is of type SomeRecord
});

const objectEntries = <T extends {}>(obj: T) =>
  Object.entries(obj) as [keyof T, T[keyof T]][];

type UnionType = { pos: number; neg: number } | { posneg: number };

type UnionToIntersect<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

function objectThings<T extends any>(obj: UnionType) {
  return Object.entries(obj) as [
    keyof UnionToIntersect<T>,
    UnionToIntersect<T>[keyof UnionToIntersect<T>]
  ][];
}

const a = objectEntries(unionArrObj[0]);
//    ^?

const b = objectThings<UnionType>(unionArrObj[0]);
//    ^?

console.log(b);

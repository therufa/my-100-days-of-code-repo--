type CompundType = { pos: number; neg: number } | { posneg: number };

const compoundObj: CompundType[] = [
  { pos: 1, neg: 2 },
  { posneg: 3 },
  { pos: 4, neg: 5 },
];

Object.entries(compoundObj).forEach(([key, value]) => {
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

const b = objectEntries(compoundObj);
//    ^?

const objEntries = Object.entries as unknown as <T extends {}>(
  obj: T
) => [keyof T, T[keyof T][]];
const a = objEntries(compoundObj);
//    ^?

a;
b;

a.forEach(([key, value]) => {
  // key is of type SomeKeys
  // value is of type number
  console.log(key, value);
});

b.forEach(([key, value]) => {
  // key is of type SomeKeys
  // value is of type number
  console.log(key, value);
});

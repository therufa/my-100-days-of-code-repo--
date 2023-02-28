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
  // value is of type SomeRecord
  // key is of type string
});

const objectEntries = <T extends {}>(obj: T): [keyof T, T[keyof T]][] =>
  Object.entries(obj) as [keyof T, T[keyof T]][];

const a = objectEntries(compoundObj);
a.forEach(([key, value]) => {
  // value is of type CompundType
  // key is of type "pos" | "neg" | "posneg"
  console.log(key, value);
});

a;

export type WatchCondition =
  | ""
  | "unworn"
  | "excellent"
  | "good"
  | "fair"
  | "needs-attention";

export type IncludedItems =
  | ""
  | "box-and-papers"
  | "box-only"
  | "papers-only"
  | "neither"
  | "unsure";

export type WatchInformation = {
  brand: string;
  model: string;
  referenceNumber: string;
  year: string;
  condition: WatchCondition;
  includedItems: IncludedItems;
  additionalDetails: string;
};

export type SellerDetails = {
  fullName: string;
  email: string;
  phone: string;
  suburb: string;
  postcode: string;
};
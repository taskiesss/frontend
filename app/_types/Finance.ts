export interface transactions {
  content: {
    amount: number;
    contractId: string;
    date: string;
    description: string;
    id: string;
    type: string;
  }[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: 10;
  totalElements: number;
  totalPages: number;
}

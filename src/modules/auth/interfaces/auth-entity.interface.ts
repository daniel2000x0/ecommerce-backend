export type AuthEntity =
  | {
      id: number;
      email: string;
      name: string;
      type: 'user';
    }
  | {
      id: number;
      email: string;
      name: string;
      type: 'customer';
    };
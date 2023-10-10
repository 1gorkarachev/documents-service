export class DocumentDto {
  id: number;
  name: string;
  template: {
    id: number;
    name: string;
  };
  fields: Array<{ name: string; value: string | number | Date }>;
}

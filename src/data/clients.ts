export type TaxReturn = {
  id: string;
  title: string;
  type: string;
  taxYear: string;
  lastAccessed: string;
  created: string;
};

export type Client = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  taxReturns: TaxReturn[];
};

export const clients: Client[] = [
  {
    id: "60fe9215-3f9f-4600-8bb8-02c0b4e362c2",
    fullName: "Juan Lopez",
    phone: "7870996778",
    email: "juanlopez90@gmail.com",
    taxReturns: [
      {
        id: "f831b980-3f13-439d-bcd0-3c6a91044498",
        title:
          "Planilla de Contribución Sobre Ingresos de Individuos - Forma Única",
        type: "Individual Income Tax Return - Unique Form (F482)",
        taxYear: "2024",
        lastAccessed: "12/17/2025",
        created: "12/15/2025",
      },
    ],
  },
  {
    id: "aabddc15-25d4-4f9a-9476-9ec0584180ec",
    fullName: "Anna Parker",
    phone: "7871111112",
    email: "anna@parker.com",
    taxReturns: [
      {
        id: "77ad23b4-1247-452a-a77e-aee482bff74e",
        title:
          "Planilla de Contribución Sobre Ingresos de Individuos - Forma Única",
        type: "Individual Income Tax Return - Unique Form (F482)",
        taxYear: "2024",
        lastAccessed: "12/12/2025",
        created: "12/12/2025",
      },
      {
        id: "9dfb6860-cacd-4ef5-8935-91e2b265fd14",
        title: "Esc 1003",
        type: "Individual Income Tax Return - Unique Form (F482)",
        taxYear: "2025",
        lastAccessed: "12/15/2025",
        created: "12/15/2025",
      },
    ],
  },
];

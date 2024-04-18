import SinglePurchasePage from "../Pages/UserAccount/SinglePurchasePage";

export const InvoiceRoute = [
  { path: "purchases/:id/:purchaseId", element: <SinglePurchasePage /> },
];

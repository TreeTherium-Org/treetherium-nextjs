import { renderSuccessResponse } from "../../helpers";

const placeholderData = {
  name: "TreeTherium",
  symbol: "TREEZ",
  description: "Tokenizing Tree Planting Worldwide",
  image: "https://app.treetherium.io/api/trees/5.png",
  external_url: "https://app.treetherium.io",
  attributes: [
    {
      trait_type: "Type",
      value: "Jacaranda",
    },
    {
      trait_type: "Location",
      value: "Malaysia",
    },
  ],
  seller_fee_basis_points: 0,
  creators: [],
};

export async function GET(req, res) {
  return new Response(JSON.stringify(placeholderData), {
    status: 200,
  });
}

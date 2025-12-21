import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6xgy4u6j",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
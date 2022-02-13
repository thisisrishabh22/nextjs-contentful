import { createClient } from "contentful";
import Recipes from "../index";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const res = client.getEntries({ content_type: "recipe" });

  return { props: { recipes: (await res).items }, revalidate: 5 };
}

export default function RecipesPage({ recipes }) {
  return <Recipes recipes={recipes} />;
}

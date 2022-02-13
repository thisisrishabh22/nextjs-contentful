import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const res = client.getEntries({ content_type: "recipe" });

  return { props: { recipes: (await res).items }, revalidate: 5 };
}

export default function Recipes({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes &&
        recipes.map((i) => {
          return (
            <div key={i.sys.id}>
              <RecipeCard recipe={i} />
            </div>
          );
        })}
      <style jsx>{`
        .recipe-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          // grid-template-columns: 1fr 1fr;
          // grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  );
}

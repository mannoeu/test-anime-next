import { Controller } from "src/services/api";

import { Header } from "src/components/Header";
import { Category } from "src/components/Category";

export default function Home({ trending, dubbed, moovies }) {
  return (
    <main className="w-full min-h-screen bg-c-dark text-c-light py-6 px-4">
      <Header />
      <div className="flex flex-col gap-10">
        <Category
          title="Popular"
          data={trending}
          getOptionId={(option) => option?.id}
          getOptionImage={(option) =>
            Controller.createImageURL({ uri: option?.category_icon })
          }
          getOptionTitle={(option) => option?.category_name}
        />
        <Category
          title="Dubbed"
          data={dubbed}
          getOptionId={(option) => option?.category_id}
          getOptionImage={(option) =>
            Controller.createImageURL({ uri: option?.category_icon })
          }
          getOptionTitle={(option) => option?.category_name}
        />
        <Category
          title="Moovies"
          data={moovies}
          getOptionId={(option) => option?.category_id}
          getOptionImage={(option) =>
            Controller.createImageURL({ uri: option?.category_icon })
          }
          getOptionTitle={(option) => option?.category_name}
        />
      </div>
      <footer className="p-4 text-center w-full mt-10">
        <span>Made with ❤️</span>
      </footer>
    </main>
  );
}

export async function getStaticProps() {
  const [trending, dubbed, moovies] = await Promise.all([
    Controller.getTrendingCategory(),
    Controller.getDubbed(),
    Controller.getMoovies(),
  ]);

  const ONE_DAY = 24 * 60 * 60 * 1000;

  return {
    props: { trending, dubbed, moovies },
    revalidate: ONE_DAY,
  };
}

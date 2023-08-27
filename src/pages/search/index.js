import { useRouter } from "next/router";
import { Controller } from "src/services/api";

import { Header } from "src/components/Header";
import { Category } from "src/components/Category";
import Link from "next/link";

export default function Search({ animes }) {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen bg-c-dark text-c-light py-6 px-4">
      <Header />
      <div className="p-4 text-center w-full mt-10">
        <span className="text-c-light-2 underline">
          <Link href="/">Home</Link>
        </span>{" "}
        / <span>Search</span>
      </div>
      <div className="flex flex-col gap-10">
        <Category
          title={`Search results for: ${router.query.q}`}
          data={animes}
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

export async function getServerSideProps(props) {
  const query = props.query.q;
  const animes = await Controller.searchAnime({ query });

  return { props: { animes } };
}

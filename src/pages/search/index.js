import Link from "next/link";
import { useRouter } from "next/router";

export default function Search({ animes }) {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24 bg-zinc-800 text-zinc-200">
      <h1 className="text-xl text-bold uppercase mb-4">Search other</h1>
      <form
        className="w-full my-8"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const query = event.target[0].value;

          if (query.trim().length) {
            router.push(`/search?q=${query}`);
          }
        }}
      >
        <input
          className="w-full rounded-md py-2 px-4 outline-none border-2 border-white focus:border-red-300 text-zinc-900"
          type="search"
          placeholder="Search anime..."
        />
      </form>

      <h1 className="text-xl text-bold uppercase mb-4">Results</h1>

      <ul className="flex flex-wrap gap-4 items-center">
        {animes?.map((item) => (
          <Link
            className="bg-zinc-200/20 rounded-sm transition-all hover:bg-zinc-600 hover:shadow-md"
            key={item?.category_id}
            href={`/anime/${item?.category_id}`}
          >
            <li className="flex flex-col justify-between w-[200px]">
              <img
                className="object-contain w-full"
                src={`https://cdn.appanimeplus.tk/img/${item?.category_icon}`}
                alt="Anime Banner"
              />
              <p className="p-4 text-zinc-200 text-md">{item?.category_name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps(props) {
  const query = props.query.q;
  const res =
    await fetch(`https://animeland.appanimeplus.tk/videoweb/api.php?action=searchvideo&searchword=${query}
  `);
  const animes = await res.json();

  return { props: { animes } };
}

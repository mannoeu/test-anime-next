import { useState } from "react";

export default function Anime({ animeInfo, episodes }) {
  const [showVideo, setShowVideo] = useState({ url: "" });

  return (
    <>
      <main className="flex flex-row h-screen w-full overflow-hidden bg-zinc-800 text-zinc-200">
        <aside className="h-full w-[300px] bg-zinc-500 p-8">
          <h1 className="text-zinc-200 text-lg mb-8">
            {animeInfo?.[0]?.category_name}
          </h1>
          <img
            className="w-full object-contain"
            src={`https://cdn.appanimeplus.tk/img/${animeInfo?.[0]?.category_icon}`}
          />
        </aside>

        <section className="h-full w-full bg-zinc-700 p-8 overflow-auto">
          <header className="w-full bg-zinc-900 shadow-sm p-8">
            <h1 className="text-zinc-200 text-lg">Episodes</h1>
          </header>
          <ul className="w-full">
            {episodes?.map((ep) => (
              <li key={ep?.video_id} className="bg-zinc-300/20 my-2 p-4">
                <button
                  className="w-full text-left"
                  onClick={() => {
                    setShowVideo({ url: ep?.location || ep?.sdlocation });
                  }}
                >
                  #{ep?.video_id} - {ep?.title}
                </button>
              </li>
            ))}
          </ul>

          {showVideo?.url && (
            <section className="absolute w-screen h-screen p-24 bg-zinc-900/90 top-0 left-0 flex items-center">
              <button
                className="absolute top-4 left-4 p-4 rounded-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-600 transition-colors"
                onClick={() => setShowVideo()}
              >
                ✘
              </button>
              <video className="w-full h-full" src={showVideo?.url} controls />
            </section>
          )}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://animeland.appanimeplus.tk/videoweb/api.php?action=viewcategory&categoryid=${context.query.id}`
  );
  const animeInfo = await res.json();

  const episodesResponse = await fetch(
    `https://animeland.appanimeplus.tk/videoweb/api.php?action=category_videos&category_id=${context.query.id}`
  );

  const episodes = await episodesResponse.json();

  return { props: { animeInfo, episodes } };
}

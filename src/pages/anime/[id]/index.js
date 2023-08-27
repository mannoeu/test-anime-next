import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Anime({ animeInfo, episodes }) {
  const { query } = useRouter();
  const [showVideo, setShowVideo] = useState({ url: "" });
  const [animeViews, setAnimeViews] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const views = JSON.parse(localStorage.getItem("views")) || {};
      setAnimeViews(views[query.id] || []);
    }
  }, []);

  const registerView = (id) => {
    const videoId = id;
    const animeId = query.id;

    const views = JSON.parse(localStorage.getItem("views")) || {};

    if (!views[animeId]) {
      views[animeId] = [];
    }

    if (!views[animeId].includes(videoId)) {
      views[animeId] = [...views[animeId], videoId];
      setAnimeViews(views[animeId] || []);
      localStorage.setItem("views", JSON.stringify(views));
    }
  };

  return (
    <>
      <main className="flex flex-row h-screen w-full overflow-hidden bg-c-grey text-c-light">
        <aside className="h-full w-[300px] bg-c-grey p-8">
          <h1 className="text-c-light text-lg mb-8">
            {animeInfo?.[0]?.category_name}
          </h1>
          <img
            className="w-full object-contain"
            src={`https://cdn.appanimeplus.tk/img/${animeInfo?.[0]?.category_icon}`}
          />
        </aside>

        <div className="w-full">
          <div className="p-4 text-center w-full">
            <span className="text-c-light-2 underline">
              <Link href="/">Home</Link>
            </span>{" "}
            / <span>{animeInfo?.[0]?.category_name}</span>
          </div>
          <section className="h-full w-full bg-c-dark p-8 overflow-auto">
            <header className="w-full bg-c-grey shadow-sm p-8">
              <h1 className="text-c-light text-lg">Episodes</h1>
            </header>
            <ul className="w-full">
              {episodes?.map((ep) => {
                const viewed = animeViews.includes(ep?.video_id);

                return (
                  <li
                    title={viewed ? "Watched" : ""}
                    key={ep?.video_id}
                    className={`my-2 p-4 ${
                      viewed ? "bg-[#8889F3]" : "bg-zinc-300/20"
                    }`}
                  >
                    <button
                      className="w-full text-left relative"
                      onClick={() => {
                        registerView(ep?.video_id);
                        setShowVideo({ url: ep?.location || ep?.sdlocation });
                      }}
                    >
                      #{ep?.video_id} - {ep?.title}
                      {viewed && (
                        <span className="absolute top-0 right-0 text-c-light">
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {showVideo?.url && (
              <section className="absolute w-screen h-screen p-24 bg-zinc-900/90 top-0 left-0 flex items-center">
                <button
                  className="absolute top-4 left-4 rounded-full p-4 flex justify-center align-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-600 transition-colors"
                  onClick={() => setShowVideo()}
                >
                  ✘
                </button>
                <video
                  className="w-full h-full"
                  src={showVideo?.url}
                  controls
                />
              </section>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "33545" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://animeland.appanimeplus.tk/videoweb/api.php?action=viewcategory&categoryid=${context.params.id}`
  );
  const animeInfo = await res.json();

  const episodesResponse = await fetch(
    `https://animeland.appanimeplus.tk/videoweb/api.php?action=category_videos&category_id=${context.params.id}`
  );

  const episodes = await episodesResponse.json();

  const FIVE_MINUTES = 5 * 60 * 1000;

  return { props: { animeInfo, episodes }, revalidate: FIVE_MINUTES };
}

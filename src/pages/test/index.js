export default function Test({ url }) {
  return (
    <>
      <main className="flex flex-row h-screen w-full overflow-hidden bg-c-grey text-c-light">
        <div className="w-full">
          <section className="h-full w-full bg-c-dark p-8 overflow-auto">
            <section className="absolute w-screen h-screen p-24 bg-zinc-900/90 top-0 left-0 flex items-center">
              <video className="w-full h-full" src={url} controls />
            </section>
          </section>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://animesvision.vercel.app/anime/player?link=https://animes.vision/animes/bungou-stray-dogs-5th-season/episodio-01/legendado`
  );
  const animeData = await res.json();

  return { props: { url: animeData["480p"] } };
}

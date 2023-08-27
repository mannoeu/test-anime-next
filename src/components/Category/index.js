import React from "react";
import { FiPlayCircle } from "react-icons/fi";

export const Category = ({
  title,
  data,
  getOptionId,
  getOptionTitle,
  getOptionImage,
}) => {
  return (
    <section className="w-full flex flex-col gap-4 max-w-[1280px] mx-auto">
      <header className="w-full flex justify-between gap-4 align-center">
        <h1 className="text-c-light text-xl font-bold">{title}</h1>
      </header>
      <ul className="grid grid-flow-col auto-cols-min gap-4 w-full overflow-x-auto pb-4 snap-x">
        {data?.map((option) => (
          <li
            key={getOptionId(option)}
            className="relative w-[220px] snap-center bg-c-grey rounded-md overflow-hidden"
          >
            <a href={`/anime/${getOptionId(option)}`}>
              <figure className="shadow-sm">
                <span className="rounded-full p-2 flex align-center justify-center bg-c-dark-opacity  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-10">
                  <FiPlayCircle size="1.5rem" className="text-c-light" />
                </span>
                <img
                  className="w-full aspect-square object-cover rounded-md rounded-b-none select-none opacity-75"
                  src={getOptionImage(option)}
                  alt={getOptionTitle(option)}
                />
                <figcaption className="px-4 py-2 select-none text-c-light">
                  <span className="line-clamp-2">{getOptionTitle(option)}</span>
                </figcaption>
              </figure>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

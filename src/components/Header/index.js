import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import { FiSearch } from "react-icons/fi";

export const Header = () => {
  const router = useRouter();
  const searchRef = useRef();
  const [error, setError] = useState("");

  const onSearch = (event) => {
    event.preventDefault();
    setError("");

    const query = searchRef?.current?.value?.trim();
    if (!query?.length) {
      return setError("Preencha o campo de pesquisa");
    }

    router.push(`/search?q=${query}`);
  };

  return (
    <header className="flex flex-col items-center w-full">
      <form
        className="w-full mt-12 flex flex-col items-center"
        onSubmit={onSearch}
      >
        <fieldset className="flex align-center mx-auto w-full max-w-[400px] bg-c-grey text-c-light rounded-md shadow-sm">
          <labe htmlFor="searchField" className="p-4 pl-4 flex items-center">
            <FiSearch />
          </labe>
          <input
            ref={searchRef}
            id="searchField"
            placeholder="Pesquisar anime"
            className="bg-transparent w-full outline-none border-none p-2"
            type="text"
          />
        </fieldset>
        {error && (
          <span className="mt-2 text-xs text-red-500 p-2">{error}</span>
        )}
      </form>
    </header>
  );
};

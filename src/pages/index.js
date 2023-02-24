import * as React from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import MenuIcon from "../assets/menu.svg";
import CrestIcon from "../assets/crest.svg";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const IFrame = ({ artworkPath }) => {
  return (
    <div className="h-screen w-screen z-30">
      <iframe
        className="h-full w-full"
        src={`/${artworkPath}/index.html`}
        title={artworkPath}
      ></iframe>
    </div>
  );
};

export default function Home() {
  const artworks = ["project", "sleeping", "ivandianov"];

  const [count, setCount] = useState(1);
  const [artworkPath, setImageName] = useState();
  const [vMenu, setVMenu] = useState(true);
  const [keyGenerator, setKeyGenerator] = useState(0);
  function hadleWorkClick() {
    setKeyGenerator((keyGenerator) => keyGenerator + 1);
    console.log(keyGenerator);
  }
  function handleClick() {
    setVMenu((vMenu) => !vMenu);
  }

  useLayoutEffect(() => {
    setImageName(artworks[Math.floor(Math.random() * artworks.length)]);
  }, []);

  return (
    <>
      <div className="h-screen w-screen noise relative">
        {vMenu && (
          <MenuIcon
            onClick={() => {
              handleClick();
            }}
            className="fixed top-0 right-2 mx-3 h-6 w-fit my-7 sm:hidden inline z-50"
          />
        )}
        {!vMenu && (
          <div className="h-screen w-screen bg-white relative z-40">
            <div className="fixed top-0 left-0">
              <div className="bg-white text-black my-6 mx-3 font-ibm text-2xl font-bold px-1 h-fit">
                ГЕНКЛУБ
              </div>
            </div>
            <CrestIcon
              onClick={() => {
                handleClick();
              }}
              className="fixed top-0 right-0 mx-3 h-6 w-fit my-7"
            />
            <div className="flex flex-col flex-wrap my-20 h-full w-full">
              <div className="bg-white text-black my-6 mx-3 font-ibm p-1 text-base leading-5	h-fit w-fit  max-w-sm ">
                Уютное место для обмена знаниями про генеративное искусство. Тут
                все всем помогают, делятся секретами, показывают свои и чужие
                работы.
              </div>
              <div className="bg-white text-black my-6 mx-3 font-ibm text-base p-1 leading-8	h-fit max-w-md ">
                <p>Присоединяйся!</p>
                <p>
                  <a href="https://t.me/gen_c">основной чат</a>
                </p>
                <p>
                  <a href="https://t.me/gan_club"> нейроарт</a>
                </p>
                <p>
                  <a href="https://t.me/every_nft_run">нфт и блокчейн</a>
                </p>
                <p>
                  <a href="wiki.genclub.club">wiki</a>
                </p>
                <p>
                  <a href="https://course.genclub.club/">набор на новый курс</a>
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="fixed top-0 left-0 flex flex-row w-full">
          <div           onClick={() => {
            hadleWorkClick();
          }}className="bg-white text-black my-6 mx-3 font-ibm text-2xl font-bold px-1 h-fit">
            ГЕНКЛУБ
          </div>

          <div className="bg-white text-black my-6 mx-3 font-ibm p-1 text-base leading-5	h-fit w-fit flex-grow-0 flex-shrink max-w-sm sm:inline hidden">
            Уютное место для обмена знаниями про генеративное искусство. Тут все
            всем помогают, делятся секретами, показывают свои и чужие работы.
          </div>
          <div className="bg-white text-black my-6 mx-3 font-ibm text-base p-1 leading-5	h-fit max-w-md sm:inline hidden">
            Присоединяйся! <a href="https://t.me/gen_c">основной чат</a> /
            <a href="https://t.me/gan_club"> нейроарт</a> /
            <a href="https://t.me/every_nft_run">нфт и блокчейн</a> /
            <a href="wiki.genclub.club">wiki</a> /
            <a href="https://course.genclub.club/">набор на новый курс</a>
          </div>
        </div>

          <IFrame key={keyGenerator} artworkPath={artworkPath} />

        <div className="fixed bottom-0 left-0 sm:flex flex-row w-full ">
          <div className="bg-white text-black my-6 mx-3 font-ibm text-base px-1 h-fit max-w-md">
            Арт: Имя Фамилия / twitter / instagram / site
          </div>
        </div>
      </div>
    </>
  );
}

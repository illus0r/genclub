import * as React from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import MenuIcon from "../assets/menu.svg";
import CrestIcon from "../assets/crest.svg";
import { useStaticQuery, graphql } from "gatsby";

const IFrame = ({ artworkPath, className }) => {
  return (
    <div className={`h-screen w-screen z-30 ${className ? className : ""}`}>
      <iframe
        className={`h-full w-full `}
        src={`/${artworkPath}/index.html`}
        title={artworkPath}
      ></iframe>
    </div>
  );
};

const FooterLink = ({ link, title }) => {
  return (
    <>
      <a href={link}>{title}</a>
      <span> / </span>
    </>
  );
};

export default function Home() {
  const [count, setCount] = useState(1);
  const [artwork, setArtwork] = useState();
  const [vMenu, setVMenu] = useState(true);
  const [keyGenerator, setKeyGenerator] = useState(0);

  const data = useStaticQuery(graphql`
    query MyQuery {
      allGoogle1Sheet {
        nodes {
          name
          slug
          instagram
          artworkTitle
          website
          twitter
        }
      }
    }
  `);
  // console.log(data.allGoogle1Sheet.nodes)
  const artworks = data.allGoogle1Sheet.nodes;

  function hadleWorkClick() {
    setKeyGenerator((keyGenerator) => keyGenerator + 1);
    console.log(keyGenerator);
  }
  function handleClick() {
    setVMenu((vMenu) => !vMenu);
  }

  useLayoutEffect(() => {
    setArtwork(artworks[Math.floor(Math.random() * artworks.length)]);
  }, []);


  return (
    <>
      <div className="h-screen w-screen noise relative">
        {vMenu && (
          <MenuIcon
            onClick={() => {
              handleClick();
            }}
            className="fixed top-0 right-2 mt-[10px] mr-[10px] h-[33px] w-[50px] py-[7px] px-[10px] bg-white md:hidden inline z-50"
          />
        )}
        {!vMenu && (
          <div className="h-screen w-screen bg-white relative z-40">
            <div className="fixed top-0 left-0">
              <div className="bg-white text-black mt-[10px] font-ibm text-logo ml-[10px] w-[128px] px-2.5  h-[34px] align-middle ">
                ГЕНКЛУБ
              </div>
            </div>
            <CrestIcon
              onClick={() => {
                handleClick();
              }}
              className="fixed top-0 right-0 mt-[13px] mr-[31px] h-fit w-fit my-7 bg-white"
            />
            <div className="flex flex-col flex-wrap h-full w-full max-h-screen">
              <div className=" text-black mt-[103px] mx-4 font-ibm text-norm h-fit w-fit  max-w-sm ">
                Уютное место для обмена знаниями про генеративное искусство. Тут
                все всем помогают, делятся секретами, показывают свои и чужие
                работы.
              </div>
              <div className=" text-black mt-[35px] mx-4 font-ibm text-norm	h-fit max-w-md ">
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
                  <a href="wiki.genclub.club">genclub.wiki</a>
                </p>
                <p>
                  <a href="https://course.genclub.club/">набор на новый курс</a>
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="fixed top-0 left-0 flex flex-row w-full">
          <div
            onClick={() => {
              hadleWorkClick();
            }}
            className={`bg-white text-black md:mt-[15px] mt-[10px] font-ibm text-logo ml-[10px] w-[128px] px-2.5  h-[33px] align-middle ${
              !vMenu ? "hidden" : ""
            }`}
          >
            <span>ГЕНКЛУБ</span>
          </div>

          <div className="bg-white text-black mt-[15px] my-6 mx-[15px] font-ibm px-2.5 py-1 text-norm h-fit max-w-[480px] md:inline hidden">
            Уютное место для обмена знаниями про генеративное искусство. Тут все
            всем помогают, делятся секретами, показывают свои и чужие работы.
          </div>
          <div className="bg-white text-black mt-[15px] my-6 mr-[30px] font-ibm text-norm	h-fit max-w-[558px] min-w-[356px] md:inline hidden px-2.5 py-1 ">
            Присоединяйся! <a href="https://t.me/gen_c">основной чат</a> /
            <a href="https://t.me/gan_club"> нейроарт</a> /
            <a href="https://t.me/every_nft_run">нфт и блокчейн</a> /
            <a href="wiki.genclub.club">wiki</a> /
            <a href="https://course.genclub.club/">набор на новый курс</a>
          </div>
        </div>

        {artwork && (
          <IFrame
            key={keyGenerator}
            artworkPath={artwork.slug}
            className={`${!vMenu ? "hidden" : ""}`}
          />
        )}

        {artwork && (
          <div className="fixed bottom-0 left-0 md:flex flex-row w-full ">
            <div
              className={`bg-white text-black md:mb-[15px] mb-[10px] md:ml-[30px] ml-[10px] font-ibm md:text-norm  text-mob md:px-2.5 px-[5px] py-1 w-fit h-fit max-w-md ${
                !vMenu ? "hidden" : ""
              }`}
            >
              Арт: {artwork.name + " "} / {" "}
              {artwork.twitter ? <FooterLink title="twitter" link={artwork.twitter }/> : ""}
              {artwork.website ? <FooterLink title="website" link={artwork.twitter }/> : ""}
              {artwork.instagram ? <FooterLink title="instagram" link={artwork.instagram }/> : ""}
              {artwork.telegram ? <FooterLink title="telegram" link={artwork.telegram}/> : ""}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

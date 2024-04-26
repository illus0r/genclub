import * as React from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import MenuIcon from "../assets/menu.svg";
import CrestIcon from "../assets/crest.svg";
import { useStaticQuery, graphql } from "gatsby";
import { useEffect } from "react";

const IFrame = ({ artworkPath, className }) => {
  return (
    <div className={`h-screen w-screen z-30 ${className ? className : ""}`}>
      <iframe
        className={`h-full w-full `}
        src={`${artworkPath}`}
        title={artworkPath}
      ></iframe>
    </div>
  );
};

const httpRegExp = /^https?:\/\/(.*)/gm;

const LinkConstruct = ({ link, title }) => {
  if (title === "telegram" && !link.match(httpRegExp))
    link = "https://t.me/" + link;
  if (title === "instagram" && !link.match(httpRegExp))
    link = "https://www.instagram.com/" + link;
  if (title === "twitter" && !link.match(httpRegExp))
    link = "https://twitter.com/" + link;

  if (!link.match(httpRegExp)) link = "http://" + link;
  if (title.match(httpRegExp)) title = title.replace(/^https?:\/\//, "");
  return (
    <>
      <a href={link}>{title}</a>
    </>
  );
};

export default function Home() {
  const [artwork, setArtwork] = useState(null);
  const [vMenu, setVMenu] = useState(true);
  const [keyGenerator] = useState(0);

 

  const data = useStaticQuery(graphql`
    query MyQuery {
      allGoogle1Sheet {
        nodes {
          name
          slug
          instagram
          artworkTitle
          website
          telegram
          twitter
          artworkUrl
        }
      }
    }
  `);
  const artworks = data.allGoogle1Sheet.nodes;

  function setNewArtwork() {
    setArtwork(artworks[Math.floor(Math.random() * artworks.length)])
  }

  function hadleWorkClick(e) {
    e.preventDefault();

    setNewArtwork();
    if (!artwork.artworkUrl || !artwork.artworkPath) setNewArtwork();
    window.gtag && window.gtag("event", "genclub button click", {
      artwork: `${artwork.name} - ${artwork.artworkTitle}`,
      artist: `${artwork.name}`,
    });
  }
  function handleClick() {
    setVMenu((vMenu) => !vMenu);
  }

  function captureArtworkView() {
    window.gtag && window.gtag("event", "view_artwork", {
      artwork: `${artwork.name} - ${artwork.artworkTitle}`,
      artist: `${artwork.name}`,
    });
  }

  useLayoutEffect(() => {
    setNewArtwork();
  }, []);

  useEffect(() => {
    if (artwork) captureArtworkView();
  }, [artwork]);

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
              <div className="bg-white text-black mt-[10px] font-ibm text-logo ml-[10px] w-[128px] px-2.5  h-[34px] align-middle select-none">
                ГЕНКЛУБ
              </div>
            </div>
            <CrestIcon
              onClick={() => {
                handleClick();
              }}
              className="fixed top-0 right-0 mt-[10px] mr-[20px] h-[33px] w-[50px] my-7 bg-white"
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
                  <LinkConstruct
                    link="https://t.me/gen_c"
                    title="основной чат"
                  />
                </p>
                <p>
                  <LinkConstruct
                    link="https://t.me/gan_club"
                    title="нейроарт"
                  />
                </p>

                <p>
                  <LinkConstruct
                    link="https://t.me/every_nft_run"
                    title="нфт и блокчейн"
                  />
                </p>
                <p>
                  <LinkConstruct link="wiki.genclub.club" title="wiki" />
                </p>
                <p>
                  <LinkConstruct
                    link="https://course.genclub.club/"
                    title="набор на новый курс"
                  />
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="fixed top-0 left-0 flex flex-row w-full">
          <div
            className={`bg-white text-black md:mt-[15px] mt-[10px] font-ibm text-logo ml-[10px] w-[128px] px-2.5  h-[33px] align-middle select-none ${
              !vMenu ? "hidden" : ""
            }`}
          >
            <span
              onClick={(e) => {
                hadleWorkClick(e);
              }}
            >
              ГЕНКЛУБ
            </span>
          </div>

          <div className="bg-white text-black mt-[15px] my-6 mx-[15px] font-ibm px-2.5 py-1 text-norm h-fit max-w-[480px] md:inline hidden">
            Уютное место для обмена знаниями про генеративное искусство. Тут все
            всем помогают, делятся секретами, показывают свои и чужие работы.
          </div>
          <div className="bg-white text-black mt-[15px] my-6 mr-[30px] font-ibm text-norm	h-fit max-w-[558px] min-w-[356px] md:inline hidden px-2.5 py-1 select-none">
            Присоединяйся!{" "}
            <LinkConstruct link="https://t.me/gen_c" title="основной чат" />
            {" / "}
            <LinkConstruct link="https://t.me/gan_club" title="нейроарт" />
            {" / "}
            <LinkConstruct
              link="https://t.me/every_nft_run"
              title="нфт и блокчейн"
            />
            {" / "}
            <LinkConstruct link="wiki.genclub.club" title="wiki" />
            {" / "}
            <LinkConstruct
              link="https://setka.design/?utm_campaign=index.html&utm_source=genclub.club&utm_medium=website"
              title="набор на новый курс"
            />
          </div>
        </div>

        {artwork && (
          <IFrame
            key={keyGenerator}
            artworkPath={
              artwork.artworkUrl
                ? artwork.artworkUrl
                : artwork.slug + "/index.html"
            }
            className={`${!vMenu ? "hidden" : ""}`}
          />
        )}

        {artwork && (
          <div className="fixed bottom-0 left-0 md:flex flex-row w-full ">
            <div
              className={`bg-white text-black md:mb-[15px] mb-[10px] md:ml-[30px] ml-[10px] font-ibm md:text-norm  text-mob md:px-2.5 px-[5px] py-1 w-fit h-fit md:max-w-full max-w-sm select-none ${
                !vMenu ? "hidden" : ""
              }`}
            >
              Арт: {artwork.name + " / "}
              {[
                artwork.website ? (
                  <LinkConstruct
                    title={artwork.website}
                    link={artwork.website}
                  />
                ) : (
                  ""
                ),
                artwork.twitter ? (
                  <LinkConstruct title="twitter" link={artwork.twitter} />
                ) : (
                  ""
                ),
                artwork.instagram ? (
                  <LinkConstruct title="instagram" link={artwork.instagram} />
                ) : (
                  ""
                ),
                artwork.telegram ? (
                  <LinkConstruct title="telegram" link={artwork.telegram} />
                ) : (
                  ""
                ),
              ]
                .filter((el) => el !== "")
                .map((el, index, array) => {
                  if (index !== array.length - 1) {
                    return [el, " / "];
                  } else {
                    return el;
                  }
                })
                .flat()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

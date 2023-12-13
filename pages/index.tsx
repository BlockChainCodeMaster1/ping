import HeaderFooter from "../layout/HeaderFooter";
import {useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Thumbs, EffectCreative } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

export default function Home() {
  const [totalNum, setTotalNum] = useState([
     {
      num: 0,
      text: "Connectivity",
    },
    {
      num: 0,
      text: "Participants",
    },
  ]);

  const [advantage, setAdvantage] = useState([
    {
      icon: "/priority_highest.svg",
      title: "Points",
      desc: "Pingme rewards players with points based on early relationship interactions and completing tasks. In the future, we will have exciting surprises in store for players who earn points!",
    },
    {
      icon: "/lianjie.svg",
      title: "Ranking System",
      desc: "Pingme showcases players' binding relationship counts and point levels on the homepage, ranked from high to low. Here, everyone can discover your social circle and its value.",
    },
    {
      icon: "/huangguan.svg",
      title:
        "Connection Relationships",
      desc: "Public Links: Expand your social circle limitlessly through our public invitation links.Private Links: For unique relationships, Pingme provides one-time private links, akin to precious tokens of love, for the most intimate connections.",
    },
    {
      icon: "/qiapian001.svg",
      title: "NFTs",
      desc: "WEstablish new social connections on Pingme and receive unique NFT rewards to showcase your one-of-a-kind social network. While currently non-transferable, we are exploring future uses to enhance their practicality.",
    },
  ]);

  return (
    <HeaderFooter>
      <main className="-mt-24">
        <div className="bg-[url('/slogin_bg.png')] bg-[length:100%_auto] py-60 w-full text-center text-white">
          <h1 className=" py-4 text-6xl font-[GT-America-Bold] uppercase bg-clip-text drop-shadow text-transparent bg-gradient-to-tl from-[#5CF0F0] to-[#1A87FF]">
            legendary companies.
          </h1>
          <p className=" py-4 text-2xl font-[GT-America-Compressed-Medium] uppercase italic drop-shadow">
            the first modular party game in Metaverse.
          </p>
          <p className="py-6">
          <Link href="/create">
            <button className="bg-[#5E68E5] py-3 px-6 rounded-lg cursor-pointer drop-shadow hover:bg-[#5E68E5]">
              Binding relationship
            </button>
            </Link>
          </p>
        </div>
        <div className="bg-[#5d44c5] flex flex-col">
          {/* <div className="flex flex-row w-8/12 mx-auto text-center text-white">
            {totalNum.map((el, index) => (
              <div key={index} className="w-6/12">
                <h1 className=" text-6xl font-[GT-America-Regular] py-4 ">
                  {el.num}
                </h1>
                <p className="font-[GT-America-Compressed-Medium] italic text-xl opacity-80 uppercase">
                  {el.text}
                </p>
              </div>
            ))}
          </div> */}
          {/* <ul className="w-8/12 py-10 mx-auto text-center">
            <li className=" mx-2 bg-[url('/twitter.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/twitter_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/discord.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/discord_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/opensea.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/opensea_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/facebook.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/facebook_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/ins.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/ins_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/telegram.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/telegram_hover.png')]"></li>
          </ul> */}
          <div className="flex flex-row flex-wrap w-8/12 mx-auto mt-20">
            {advantage.map((el, index) => (
              <div key={index} className="flex flex-col w-6/12 p-2">
                <div className="p-6 text-white bg-white rounded-lg bg-opacity-10 ">
                  <div className="flex flex-row">
                    <i className="p-4 rounded-lg ">
                      <img src={el.icon} className="w-16 h-16" />
                    </i>
                    <h1 className="font-[GT-America-Compressed-Medium] italic text-3xl uppercase p-6">
                      {el.title}
                    </h1>
                  </div>
                  <p className="text-sm opacity-70">{el.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[url('/rank_bg.png')] bg-[#5d44c5] bg-[length:1550px_auto] pt-40 pb-20">
          <h1 className="font-[GT-America-Compressed-Medium] italic text-4xl uppercase p-4  text-center text-white">
            Relationship Ranking
          </h1>
          <div>
            <img src="system.png" className="w-7/12 mx-auto" />
          </div>
        </div>
        <div className="bg-[#5d44c5] pt-20 pb-40">
          <div className="w-10/12 mx-auto">
            <h1 className="font-[GT-America-Compressed-Medium] italic text-4xl uppercase p-4 text-center text-white">
              Relationship Ranking
            </h1>
          </div>
        </div>
      </main>
    </HeaderFooter>
  );
}

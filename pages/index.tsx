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
      icon: "/rabbit.svg",
      title: "We are good at pulling a rabbit out of a hat.",
      desc: "For current industry hot spots, we can make quick respond and quickly output what the market wants from operational fundamentals, KOL advertising channels, matching economic models, and products.",
    },
    {
      icon: "/water.svg",
      title: "We have flow and KOLs from all over the world.",
      desc: "We have super Top KOLs and communities of SoutheastAsia, Chinese-speaking area, Japan and South Korea, nextto emerging regions such as Africa.",
    },
    {
      icon: "/rush.svg",
      title:
        "Fighting on the front line, improving the success rate of our portfolio.",
      desc: "On the public traffic battlefield, we are clear about the focus of users in community operations and which channels and media advertising are more effective. ",
    },
    {
      icon: "/gold.svg",
      title: "A prudent financial system in operation.",
      desc: "We are good at helping projects cold start and cross the gap from 0 to 1.",
    },
  ]);

  return (
    <HeaderFooter>
      <main>
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
          <div className="flex flex-row w-8/12 mx-auto text-center text-white">
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
          </div>
          <ul className="w-8/12 py-10 mx-auto text-center">
            <li className=" mx-2 bg-[url('/twitter.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/twitter_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/discord.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/discord_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/opensea.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/opensea_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/facebook.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/facebook_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/ins.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/ins_hover.png')]"></li>
            <li className=" mx-2 bg-[url('/telegram.png')] cursor-pointer bg-no-repeat bg-cover w-6 h-6 inline-block hover:bg-[url('/telegram_hover.png')]"></li>
          </ul>
          <div className="flex flex-row flex-wrap w-8/12 mx-auto">
            {advantage.map((el, index) => (
              <div key={index} className="flex flex-col w-6/12 p-2">
                <div className="p-6 text-white bg-white rounded-lg bg-opacity-10">
                  <i className="p-4 bg-white bg-opacity-50 rounded-lg ">
                    <img src="" className="w-8 h-8" />
                  </i>
                  <h1 className="font-[GT-America-Compressed-Medium] italic text-3xl uppercase p-4">
                    Link Relationship
                  </h1>
                  <p className="text-sm opacity-70">
                    Explorers will push interesting people around you in
                    real-time based on your current location, geographical
                    distance, and gender preferences. What you need to do is -
                    it&apos;s slippery! I like to slide to the right, but I have
                    no feeling when sliding to the left, it cannot be simpler.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[url('/rank_bg.png')] bg-[#5d44c5] bg-[length:1440px_auto] pt-40 pb-20">
          <h1 className="font-[GT-America-Compressed-Medium] italic text-4xl uppercase p-4  text-center text-white">
            Relationship Ranking
          </h1>
          <div className="w-10/12 mx-auto my-4">
            <Swiper
              loop={true}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              <SwiperSlide>
                <ul className="flex flex-row flex-wrap w-full p-6 bg-white bg-opacity-5 rounded-2xl">
                  <li className="w-6/12 p-2">
                    <span className="block h-20 p-4 bg-white rounded-xl">
                      12312313
                    </span>
                  </li>
                  <li className="w-6/12 p-2">
                    <span className="block h-20 p-4 bg-white rounded-xl">
                      12312313
                    </span>
                  </li>
                  <li className="w-6/12 p-2">
                    <span className="block h-20 p-4 bg-white rounded-xl">
                      12312313
                    </span>
                  </li>
                  <li className="w-6/12 p-2">
                    <span className="block h-20 p-4 bg-white rounded-xl">
                      12312313
                    </span>
                  </li>
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul className="flex flex-row flex-wrap w-full p-6 bg-white bg-opacity-5 rounded-xl">
                  <li className="w-6/12 p-2">
                    <span className="block h-20 p-4 bg-white rounded-xl">
                      12312313
                    </span>
                  </li>
                  <li className="w-6/12 p-2">
                    <span className="block h-20 p-4 bg-white rounded-xl">
                      12312313
                    </span>
                  </li>
                  <li className="w-6/12 p-2">
                    <span className="block h-20 p-4 bg-white rounded-xl">
                      12312313
                    </span>
                  </li>
                  <li className="w-6/12 p-2">
                    <span className="block h-20 p-4 bg-white rounded-xl">
                      12312313
                    </span>
                  </li>
                </ul>
              </SwiperSlide>
            </Swiper>
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

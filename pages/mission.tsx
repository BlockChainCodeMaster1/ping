import HeaderFooter from "../layout/HeaderFooter";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Thumbs, EffectCreative } from "swiper/modules";
import "swiper/css";

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
      <main className="bg-[#5E42C6] pt-10 pb-40">
        <div className="flex flex-row items-center w-10/12 p-4 mx-auto">
          <div className="w-20 h-20 mr-4 bg-white border-4 border-white border-opacity-50 rounded-full"></div>
          <div className="text-white">
            <h1 className="text-2xl ">NAME</h1>
            <p className="opacity-50 ">
              0x1f53664f930774d82e8ffdb32541ae0e6ab4c860
            </p>
          </div>
        </div>
        <ul className="flex w-10/12 gap-8 p-4 mx-auto flex-rol">
            <li></li>
        </ul>
      </main>
    </HeaderFooter>
  );
}

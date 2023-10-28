import HeaderFooter from "../layout/HeaderFooter";
import { useState, useEffect } from "react";
import "swiper/css";
import {
  usePublicClient,
  useWalletClient,
  useAccount,
  useDisconnect,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSignMessage,
} from "wagmi";
import {
  getPublicRelationshipLink,
  getPrivateRelationshipLink,
} from "../api";
import CONFIG from "../config";
import { useWeb3Modal } from "@web3modal/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import Link from "next/link";


export default function Home() {
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  console.log("isConnected", isConnected);
  const { open } = useWeb3Modal();

  const router = useRouter();
  console.log("router", router);

  const publicClient = usePublicClient();
  console.log(publicClient);

  const { data: walletClient } = useWalletClient();
  console.log(walletClient);

  const [publicRelationLink, setPublicRelationLink] = useState([])
  const [privateRelationLink, setPrivateRelationLinks] = useState([])


  useEffect(() => {
    setAccount(address as `0x${string}`);
    setConnected(isConnected);
    const interval = setInterval(async () => {
      if (address) {
        setAccount(address);
        setConnected(isConnected);
        const {data: publicRelationLinks} = await getPublicRelationshipLink(address)
        setPublicRelationLink(publicRelationLinks)
        const  {data: privateRelationLinks} = await getPrivateRelationshipLink(address)
        setPrivateRelationLinks(privateRelationLinks)
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [address, isConnected]);

 

  return (
    <HeaderFooter>
      <main className="pb-40 pt-16">

        {!connected && (
          <div className="flex justify-center items-center fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-lg z-50">
            <button
              onClick={() => open()}
              className="bg-[#EB0661] text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Connenct Wallet
            </button>
          </div>
        )}
        <div className="bg-[url('/user_bg.png')] bg-no-repeat bg-bottom h-56 -z-10 pt-8 -mt-16">
          <div className="flex flex-col items-center w-10/12 p-4 mx-auto text-center">
            <div className="w-20 h-20 bg-white border-4 border-white border-opacity-50 rounded-full"></div>
            <div className="text-white mt-4">
              {/* <h1 className="text-2xl">NAME</h1> */}
              <p className="opacity-50 mt-1">{account}</p>
            </div>
          </div>
        </div>
        <div className="flex w-10/12 gap-8 p-4 mx-auto flex-rol">
            <Link href="/create"><button className="bg-[#EB0661] text-white px-4 py-2 rounded-md cursor-pointer">Create Invite Link</button></Link>
        </div>
        <div className="flex w-10/12 gap-8 p-4 mx-auto flex-rol">
              <div className="w-6/12">
                <div>
                  <h1 className="mb-4 text-xl text-white">introduction</h1>
                </div>
                <ul className="p-4 my-2 mt-4 text-white bg-white rounded bg-opacity-10">
                  <li className="text-sm flex  justify-between">
                    <span>Open Relationship Invitation Link</span>
                  </li>
                  {publicRelationLink.map((el,index)=><li key={index} className="flex flex-row my-2 justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-[#80ABFF] text-ellipsis">
                      http://pingme.love/create?inviteCode={el['inviteCode']}
                    </span>
                    <CopyToClipboard
                      text={`http://pingme.love/create?inviteCode=${el['inviteCode']}`}
                      onCopy={() => alert("Success!")}
                    >
                      <button className="bg-[#EB0661] text-white pl-4 py-1 pr-6 rounded-md cursor-pointer flex flex-row items-center">
                        <img src="/icon_copy.png" className="w-4 h-4 mr-2" />
                        <span>Copy</span>
                      </button>
                    </CopyToClipboard>
                  </li>)}
                </ul>
              </div>
              <div className="w-6/12">
                <div>
                  <h1 className="mb-4 text-xl text-white">introduction</h1>
                </div>
                <ul className="p-4 my-2 mt-4 text-white bg-white rounded bg-opacity-10">
                  <li className="text-sm flex  justify-between">
                    <span>Open Relationship Invitation Link</span>
                  </li>
                  {privateRelationLink.map((el,index)=><li key={index} className="flex flex-row my-2 justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-[#80ABFF] text-ellipsis">
                        http://pingme.love/create?inviteCode={el['inviteCode']}
                    </span>
                    <CopyToClipboard
                      text={`http://pingme.love/create?inviteCode=${el['inviteCode']}`}
                      onCopy={() => alert("Success!")}
                    >
                      <button className="bg-[#EB0661] text-white pl-4 py-1 pr-6 rounded-md cursor-pointer flex flex-row items-center">
                        <img src="/icon_copy.png" className="w-4 h-4 mr-2" />
                        <span>Copy</span>
                      </button>
                    </CopyToClipboard>
                  </li>)}
                </ul>
              </div>
            </div>

            <div className="flex w-10/12 gap-8 p-4 mx-auto flex-rol">
              <div className="w-6/12">
                <div>
                  <h1 className="mb-4 text-xl text-white">introduction</h1>
                </div>
                <ul className="p-4 my-2 mt-4 text-white bg-white rounded bg-opacity-10">
                  {publicRelationLink.map((el,index)=><li key={index} className="flex flex-row my-2 justify-between">
                    {el['to'] && <span className="overflow-hidden whitespace-nowrap text-[#80ABFF] text-ellipsis">
                      {el['type']} {el['range']} {el['from']} X {el['to']}
                    </span>
                    }
                  </li>)}
                </ul>
              </div>
              <div className="w-6/12">
                <div>
                  <h1 className="mb-4 text-xl text-white">introduction</h1>
                </div>
                <ul className="p-4 my-2 mt-4 text-white bg-white rounded bg-opacity-10">
                  {privateRelationLink.map((el,index)=><li key={index} className="flex flex-row my-2 justify-between">
                    {el['to'] && <span className="overflow-hidden whitespace-nowrap text-[#80ABFF] text-ellipsis">
                      {el['type']} {el['range']} {el['from']} X {el['to']}
                    </span>
                    }
                  </li>)}
                </ul>
              </div>
            </div>
      </main>
    </HeaderFooter>
  );
}

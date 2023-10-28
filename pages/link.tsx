import HeaderFooter from "../layout/HeaderFooter";
import { useState, useEffect } from "react";
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
    createPublicRelationship,
    createPrivateRelationship,
    getAndUpdateIndex,
    getPublicRelationshipLink,
    getPublicAccountByInviteCode,
    getPrivateAccountByInviteCode,
  } from "../api";
import { useWeb3Modal } from "@web3modal/react";
import { useRouter } from "next/router";
import CONFIG from "../config";
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

  const [type, setType] = useState(0)
  const [kol, setKol] = useState("")

  const getInitData = async() => {
    const { query } = router
    console.log("routerinner", router)
    if(query?.publicInviteCode){
        console.log("publicInviteCode", query?.publicInviteCode)
        const {data} = await getPublicAccountByInviteCode(String(query?.publicInviteCode))
        setType(data.type)
        setKol(data.from)
        console.log("publicInviteCode", data.type, data.from)
    }

    if(query?.privateInviteCode){
        console.log("privateInviteCode", query?.privateInviteCode)
        const {data} = await getPrivateAccountByInviteCode(String(query?.privateInviteCode))
        setType(data.type)
        setKol(data.from)
        console.log("privateInviteCode", data.type, data.from)
    }
  }

  useEffect(() => {
    setAccount(address as `0x${string}`);
    setConnected(isConnected);
    if (router.isReady) {
        getInitData()
    }

    const interval = setInterval(async () => {

      if (address) {
        setAccount(address);
        setConnected(isConnected);
        //       const { inviteCode: publicInviteCode } = await getPublicRelationshipLink(address);
        //       setPublicInviteCode(publicInviteCode)
        //       console.log("publicInviteCode", publicInviteCode);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [address, isConnected, router.isReady]);

  const [step, setStep] = useState(0)
  
  var { data:publicRelationshipData , isLoading, isSuccess, write:createPublicRelationship } = useContractWrite({
    ...CONFIG.PingMeNFT,
    functionName: "createPublicRelationship",
    onError(error) {
        alert(error)
        console.log('Error', error)
    },
    onSuccess(data) {
        setStep(1)
        console.log('Success', data)
    },
  });

  var { data:privateRelationshipData , isLoading, isSuccess, write:createPrivateRelationship } = useContractWrite({
    ...CONFIG.PingMeNFT,
    functionName: "createPrivateRelationship",
    onError(error) {
        alert(error)
        console.log('Error', error)
    },
    onSuccess(data) {
        setStep(1)
        console.log('Success', data)
    },
  });

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
        <div className="bg-[url('/user_bg.png')] bg-no-repeat bg-bottom h-56 -z-10 pt-8  -mt-16">
          <div className="flex flex-col items-center w-10/12 p-4 mx-auto text-center">
            <div className="w-20 h-20 bg-white border-4 border-white border-opacity-50 rounded-full"></div>
            <div className="text-white mt-4">
              {/* <h1 className="text-2xl">NAME</h1> */}
              <p className="opacity-50 mt-1">{account}</p>
            </div>
          </div>
        </div>
        {step == 0 && 
            <div className=" h-96 flex flex-col items-center justify-center text-white">
                <h1 className=" py-4 text-4xl mt-20">🎉 {kol} 想与你创建{type}💑关系 🎉</h1>
                <h2 className="py-4">
                    点击下方按钮确认创建
                </h2>
                <button
                className="bg-[#EB0661] text-white cursor-pointer px-16 py-2 rounded-lg"
                onClick={async()=>{

                    const { query } = router
                    if(query?.publicInviteCode){
                        console.log("publicInviteCode", query?.publicInviteCode)
                        const {data} = await getPublicAccountByInviteCode(String(query?.publicInviteCode))
                        console.log("account", data.signature)
                        createPublicRelationship({
                            args: [
                                data.from,
                                data.type,
                                data.signature,
                            ],
                        });
                    }

                    if(query?.privateInviteCode){
                        console.log("privateInviteCode", query?.privateInviteCode)
                        const {data} = await getPublicAccountByInviteCode(String(query?.privateInviteCode))
                        console.log("account", data.signature)
                        createPrivateRelationship({
                            args: [
                                data.from,
                                data.type,
                                data.signature,
                            ],
                        });
                    }
                }}
                >
                创建关系
                </button>
            </div>
        }
        {step == 1 && 
            <div className="py-10">
                <div className="h-96  flex flex-col items-center justify-center text-white">
                <h1 className=" py-4 text-4xl mt-20">🎉 恭喜您 🎉</h1>
                <h2 className="py-4">
                    已为您创建好邀请链接，发送给对方绑定关系。
                </h2>
                <p className=" py-4">
                    <Link href="/user">
                    <button className="bg-[#EB0661] text-white cursor-pointer px-4 py-2 rounded-lg">
                        <span>我也去创建</span>
                    </button>
                    </Link>
                </p>
                </div>
            </div>
        }
      </main>
    </HeaderFooter>
  );
}

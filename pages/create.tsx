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
  createPublicRelationship,
  createPrivateRelationship,
  getAndUpdateIndex,
  getPublicRelationshipLink,
} from "../api";
import CONFIG from "../config";
import { useWeb3Modal } from "@web3modal/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";

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

  // var {
  //   data: signature,
  //   isError,
  //   isLoading,
  //   isSuccess,
  //   signMessage,
  // } = useSignMessage({
  //   message: String(hashMsg),
  //   onSuccess:(data)=>{
  //     console.log(data)
  //     const hashedMessage = `0x${Buffer.from(data, "utf8").toString("hex")}`;
  //     console.log("hashedMessage", hashedMessage);
  //   }
  // });

  // var { config } = usePrepareContractWrite({
  //   ...CONFIG.PingMeNFT,
  //   functionName: "createPublicRelationship"
  // });

  // var { data, isLoading, isSuccess, write } = useContractWrite({
  //   ...CONFIG.PingMeNFT,
  //   functionName: "createPublicRelationship",
  // });

  // var { data, isLoading, isSuccess, write } = useContractWrite(config);
  // console.log("useContractWrite", data, isLoading, isSuccess );

  useEffect(() => {
    setAccount(address as `0x${string}`);
    setConnected(isConnected);
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
  }, [address, isConnected]);

  const [step, setStep] = useState(0);
  const [relationshipType, setRelationshipType] = useState(0);
  const [relationshipRange, setRelationshipRange] = useState(0);
  const [publicInviteCode, setPublicInviteCode] = useState("");
  const [privateInviteCode, setPrivateInviteCode] = useState("");
  const [signature, setSignature] = useState("");

  var {
    data: publicHashMsg,
    isError,
    isLoading,
    refetch: getPublicHash,
  } = useContractRead({
    ...CONFIG.PingMeNFT,
    functionName: "getPublicHash",
    args: [address, 0],
    enabled: !!address,
  });
  console.log(
    "getPublicHash",
    publicHashMsg,
    isError,
    isLoading
  );

  const getPublicInviteCode = async () => {
    getPublicHash();
    const signature = await walletClient?.request({
      method: "personal_sign",
      params: [publicHashMsg as `0x${string}`, account as `0x${string}`],
    });
    setSignature(signature as `0x${string}`);
    const { inviteCode } = await createPublicRelationship(
      account,
      signature as `0x${string}`,
      relationshipType,
      relationshipRange
    );
    console.log("createPublicRelationship", inviteCode);
    setPublicInviteCode(inviteCode);
  };

  const [privateIndex, setPrivateIndex] = useState(0);
  var {
    data: privataHashMsg,
    isError,
    isLoading,
    refetch: getPrivateHash,
  } = useContractRead({
    ...CONFIG.PingMeNFT,
    functionName: "getPrivateHash",
    args: [address, privateIndex, 0],
    enabled: privateIndex != 0,
  });
  console.log("getPrivateHash", privataHashMsg, isError, isLoading);

  const getPrivateInviteCode = async () => {
    const { index } = await getAndUpdateIndex();
    console.log("index", index);
    setPrivateIndex(index);
    console.log("setPrivateIndex", index)
    getPrivateHash();

    console.log("getPrivateHash");

    const signature = await walletClient?.request({
      method: "personal_sign",
      params: [privataHashMsg as `0x${string}`, account as `0x${string}`],
    });
    setSignature(signature as `0x${string}`);
    const { inviteCode } = await createPrivateRelationship(
      account,
      signature as `0x${string}`,
      relationshipType,
      relationshipRange
    );
    setPrivateInviteCode(inviteCode);
  };

  return (
    <HeaderFooter>
      <main className="pb-40 pt-16">
        {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
        {/* <button
          onClick={async () => {
            write({
              args: [
                "0x1E2295bEF57b4a0b3FdDcee0Df923ee4923973Cc",
                0,
                "0x394553912aa367e1f8f239a0e7684728bf3fc2074cde27aa8ec814c16ddc67d779b658ef2845820be8906ca30c3c94352fe4113892b036bef0a2c40ea4270edc1b",
              ],
            });
          }}
        >
          {"open"}
        </button> */}
        {/* connected  */}

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
        <div className="py-10">
          <div className=" bg-white bg-opacity-10 w-[38rem] mx-auto rounded-full text-white text-xs">
            <div
              className={
                "bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 rounded-full p-4 text-center transition-all " +
                (step == 0 ? "w-3/12" : "") +
                (step == 1 ? "w-6/12" : "") +
                (step == 2 ? "w-9/12" : "") +
                (step == 3 ? "w-12/12" : "")
              }
            >
              {step == 0 && "第一步 选择关系类型"}
              {step == 1 && "第二步 选择关系范围"}
              {step == 2 && "第三步 钱包签名"}
              {step == 3 && "第四步 创建完成"}
            </div>
          </div>

          {step == 0 && (
            <ul className="flex flex-row gap-4 my-20 justify-center text-white text-center font-bold">
              <li
                className={
                  "   w-48 h-48 rounded-2xl cursor-pointer bg-[url('/icon_love.svg')] bg-no-repeat bg-center bg-[length:4rem_auto] " +
                  (relationshipType == 0 ? "bg-[#EB0661]" : "bg-[#6649d6]")
                }
                onClick={() => setRelationshipType(0)}
              >
                <p className=" mt-36">Love</p>
              </li>
              <li
                className={
                  "   w-48 h-48 rounded-2xl cursor-pointer bg-[url('/icon_family.svg')] bg-no-repeat bg-center bg-[length:4rem_auto] " +
                  (relationshipType == 1 ? "bg-[#EB0661]" : "bg-[#6649d6]")
                }
                onClick={() => setRelationshipType(1)}
              >
                <p className=" mt-36">Family</p>
              </li>
              <li
                className={
                  "   w-48 h-48 rounded-2xl cursor-pointer bg-[url('/icon_friend.svg')] bg-no-repeat bg-center bg-[length:4rem_auto] " +
                  (relationshipType == 2 ? "bg-[#EB0661]" : "bg-[#6649d6]")
                }
                onClick={() => setRelationshipType(2)}
              >
                <p className=" mt-36">Friend</p>
              </li>
            </ul>
          )}

          {step == 1 && (
            <ul className="flex flex-row gap-4 my-20 justify-center text-white text-center font-bold">
              <li
                className={
                  "   w-48 h-48 rounded-2xl cursor-pointer bg-[url('/icon_public.svg')] bg-no-repeat bg-center bg-[length:4rem_auto] " +
                  (relationshipRange == 0 ? "bg-[#EB0661]" : "bg-[#6649d6]")
                }
                onClick={() => setRelationshipRange(0)}
              >
                <p className=" mt-36">Public</p>
              </li>
              <li
                className={
                  "   w-48 h-48 rounded-2xl cursor-pointer bg-[url('/icon_private.svg')] bg-no-repeat bg-center bg-[length:4rem_auto] " +
                  (relationshipRange == 1 ? "bg-[#EB0661]" : "bg-[#6649d6]")
                }
                onClick={() => setRelationshipRange(1)}
              >
                <p className=" mt-36">Private</p>
              </li>
            </ul>
          )}

          {step == 2 && (
            <div className=" h-[22rem] flex flex-col items-center justify-center text-white">
              <h1 className=" py-4">点击下方按钮签名钱包</h1>
              <button
                onClick={async () => {
                  if (relationshipRange == 0) {
                    await getPublicInviteCode();
                  } else if (relationshipRange == 1) {
                    await getPrivateInviteCode();
                  }
                  setStep(step + 1);
                }}
                className="bg-[#EB0661] text-white cursor-pointer px-16 py-2 rounded-lg"
              >
                签名获取邀请链接
              </button>
            </div>
          )}

          {step == 3 && (
            <div className=" h-[22rem] flex flex-col items-center justify-center text-white">
              <h1 className=" py-4 text-4xl mt-32">🎉 恭喜您 🎉</h1>
              <h2 className="py-4">
                已为您创建好邀请链接，发送给对方绑定关系。
              </h2>
              <p className=" opacity-50 py-4">
                https://pingme.love/link?
                {publicInviteCode != ""
                  ? "publicInviteCode=" + publicInviteCode
                  : ""}
                {privateInviteCode != ""
                  ? "privateInviteCode=" + privateInviteCode
                  : ""}
              </p>
              <p className=" py-4">
                <CopyToClipboard
                  text={`https://pingme.love/link?${
                    publicInviteCode != ""
                      ? "publicInviteCode=" + publicInviteCode
                      : ""
                  }${
                    privateInviteCode != ""
                      ? "privateInviteCode=" + privateInviteCode
                      : ""
                  }`}
                  onCopy={() => alert("Success!")}
                >
                  <button className="bg-[#EB0661] text-white cursor-pointer px-4 py-2 rounded-lg">
                    <img
                      src="/icon_copy.png"
                      className="w-4 h-4 inline-block mr-2"
                    />
                    <span>Copy</span>
                  </button>
                </CopyToClipboard>
              </p>
              <p className="  py-16">
                <button
                  onClick={() => setStep(0)}
                  className=" bg-white bg-opacity-0 hover:bg-opacity-10 border-white border-solid 
                    border text-white cursor-pointer px-16 py-2 rounded-lg mr-4"
                >
                  继续创建
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://x.com/intent/tweet?text=This%20is%20my%20invite%20link%3A%0Ahttps://pingme.love/link?${
                        publicInviteCode != ""
                          ? "publicInviteCode=" + publicInviteCode
                          : ""
                      }${
                        privateInviteCode != ""
                          ? "privateInviteCode=" + privateInviteCode
                          : ""
                      }`
                    )
                  }
                  className="bg-[#EB0661] text-white cursor-pointer px-16 py-2 rounded-lg hover:bg-[#eb063c]"
                >
                  分享至推特
                </button>
              </p>
            </div>
          )}
          <div className="flex justify-end w-10/12 mx-auto">
            {step > 0 && step != 3 && (
              <button
                onClick={() => {
                  setStep(step - 1);
                }}
                className=" bg-white bg-opacity-0 hover:bg-opacity-10 
            border-white border-solid border text-white cursor-pointer px-16 py-2 rounded-lg mr-4"
              >
                Prev
              </button>
            )}
            {step != 3 && (
              <button
                onClick={() => {
                  console.log("signature", signature != "", signature);
                  if (step == 2 && signature != "") {
                    setStep(step + 1);
                  }
                  if (step != 2) {
                    setStep(step + 1);
                  }
                }}
                className="bg-[#EB0661] text-white cursor-pointer px-16 py-2 rounded-lg hover:bg-[#eb063c]"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* <div className="flex w-10/12 gap-8 p-4 mx-auto flex-rol">
              <div className="w-6/12">
                <div>
                  <h1 className="mb-4 text-xl text-white">introduction</h1>
                </div>
                <ul className="p-4 my-2 mt-4 text-white bg-white rounded bg-opacity-10">
                  <li className="text-sm flex  justify-between">
                    <span>Open Relationship Invitation Link</span>
                    <button
                      className="bg-[#EB0661] text-white px-4 py-2 rounded-md cursor-pointer"
                      onClick={async () => {
                        const signature = await walletClient?.request({
                          method: "personal_sign",
                          params: [
                            hashMsg as `0x${string}`,
                            account as `0x${string}`,
                          ],
                        });
                        createPublicRelationship(
                          account,
                          signature as `0x${string}`
                        );
                        alert(signature);
                      }}
                    >
                      Generate a relationship
                    </button>
                  </li>
                  <li className="flex flex-row my-2 justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-[#80ABFF] text-ellipsis">
                      http://localhost:8080/link?i={publicInviteCode}
                    </span>
                    <CopyToClipboard
                      text={`http://localhost:8080/link?i=${publicInviteCode}`}
                    >
                      <button className="bg-[#EB0661] text-white pl-4 py-1 pr-6 rounded-md cursor-pointer flex flex-row items-center">
                        <img src="/icon_copy.png" className="w-4 h-4 mr-2" />
                        <span>Copy</span>
                      </button>
                    </CopyToClipboard>
                  </li>
                  <li className="text-sm flex  justify-between">
                    <span>Private Relationship Invitation Link</span>
                    <button
                      className="bg-[#EB0661] text-white px-4 py-2 rounded-md cursor-pointer"
                      onClick={async () => {
                        const signature = await walletClient?.request({
                          method: "personal_sign",
                          params: [
                            hashMsg as `0x${string}`,
                            account as `0x${string}`,
                          ],
                        });
                        createPublicRelationship(
                          account,
                          signature as `0x${string}`
                        );
                        alert(signature);
                      }}
                    >
                      Generate a relationship
                    </button>
                  </li>
                  <li className="flex flex-row my-2">
                    <span className="overflow-hidden whitespace-nowrap text-[#80ABFF] text-ellipsis">
                      https://dribbble.com/shots/22277135-N-letter-logo-design-monogram-nature-natural
                    </span>
                    <button className="bg-[#EB0661] text-white pl-4 py-1 pr-6 rounded-md cursor-pointer flex flex-row items-center">
                      <img src="/icon_copy.png" className="w-4 h-4 mr-2" />
                      <span>Copy</span>
                    </button>
                  </li>
                  <li className="flex flex-row my-2">
                    <span className="overflow-hidden whitespace-nowrap text-[#80ABFF] text-ellipsis">
                      https://dribbble.com/shots/22277135-N-letter-logo-design-monogram-nature-natural
                    </span>
                    <button className="bg-[#EB0661] text-white pl-4 py-1 pr-6 rounded-md cursor-pointer flex flex-row items-center">
                      <img src="/icon_copy.png" className="w-4 h-4 mr-2" />
                      <span>Copy</span>
                    </button>
                  </li>
                  <li className="flex flex-row my-2">
                    <span className="overflow-hidden whitespace-nowrap text-[#80ABFF] text-ellipsis">
                      https://dribbble.com/shots/22277135-N-letter-logo-design-monogram-nature-natural
                    </span>
                    <button className="bg-[#EB0661] text-white pl-4 py-1 pr-6 rounded-md cursor-pointer flex flex-row items-center">
                      <img src="/icon_copy.png" className="w-4 h-4 mr-2" />
                      <span>Copy</span>
                    </button>
                  </li>
                  <li className="flex flex-row my-2">
                    <span className="overflow-hidden whitespace-nowrap text-[#80ABFF] text-ellipsis">
                      https://dribbble.com/shots/22277135-N-letter-logo-design-monogram-nature-natural
                    </span>
                    <button className="bg-[#EB0661] text-white pl-4 py-1 pr-6 rounded-md cursor-pointer flex flex-row items-center">
                      <img src="/icon_copy.png" className="w-4 h-4 mr-2" />
                      <span>Copy</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="w-6/12">
                <div>
                  <h1 className="mb-4 text-xl text-white">Introduction</h1>
                  <textarea className="w-full p-4 text-white bg-white rounded outline-none bg-opacity-10 h-80"></textarea>
                </div>
              </div>
            </div> */}
      </main>
    </HeaderFooter>
  );
}

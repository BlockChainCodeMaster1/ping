export default function Footer() {
  return (
    <footer className="flex flex-col justify-center bg-[url('/footer_bg.png')] h-60 sm:bg-[length:1920px_auto]  bg-[length:920px_auto] bg-no-repeat -mt-40">
      <div className="w-full mt-14 sm:mt-36">
        <div className="flex flex-col items-center justify-between w-10/12 h-10 m-auto sm:flex-row sm:w-7/12">
          <div className="flex flex-row items-center justify-center gap-3">
            <a target="_blank" href="https://twitter.com/Pingme_love">
              <i className="bg-[url('/twitter.png')] bg-no-repeat bg-contain w-4 h-4 block hover:bg-[url('/twitter_hover.png')]"></i>
            </a>
            <a target="_blank" href="https://t.me/PingMe_CN">
              <i className="bg-[url('/telegram.png')] bg-no-repeat bg-contain w-4 h-4 block hover:bg-[url('/telegram_hover.png')]"></i>
            </a>
            <a href="mailto:contact@alab.fund">
              <i className="bg-[url('/email.png')] bg-no-repeat bg-contain w-4 h-4 block hover:bg-[url('/email_hover.png')]"></i>
            </a>
          </div>
          <div className="text-xs text-white">
            © 2023 Walk.Fun, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Badge(props: { text: string; icon: React.ReactNode }) {
  return (
    <div className="group flex justify-center">
      {/* <div className="invisible hover:visible h-6 w-[86px] bg-lightpurple-100 rounded-[30px] uppercase text-black font-bold text-[10px] leading-[13px] text-center pt-[6px]"> */}
      <div className="invisible group-hover:visible absolute -mt-[30px] h-6 px-4 bg-lightpurple-700 border border-lightpurple-600 rounded-md text-lightpurple-500 font-bold text-[10px] leading-[13px] text-center pt-[6px]">
        {props.text}
      </div>
      <div className="invisible group-hover:visible absolute -mt-[7px] border-[6px] border-transparent border-t-lightpurple-600"></div>
      <div className="invisible group-hover:visible absolute -mt-[7px] border-[5px] border-transparent border-t-lightpurple-700"></div>
      {props.icon}
    </div>
  );
}

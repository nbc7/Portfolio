interface LinkCardItemProps {
  icon: React.ReactNode;
  text: string;
  url?: string;
}

export function LinkCardItem(props: LinkCardItemProps) {
  return (
    <div className="flex items-center">
      <div className="px-[10px]">{props.icon}</div>
      {props.url ? (
        <a href={props.url} target="_blank" className="text-[13px] leading-4 font-normal ml-[10px] hover:text-white">
          {props.text}
        </a>
      ) : (
        <strong className="text-[13px] leading-4 font-normal ml-[10px]">{props.text}</strong>
      )}
    </div>
  );
}

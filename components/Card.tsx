export function Card(props: { children: React.ReactNode }) {
  return <div className={`h-full bg-lightpurple-700 rounded-[20px] p-[30px] shadow-card`}>{props.children}</div>;
}

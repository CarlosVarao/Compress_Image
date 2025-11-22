interface typesProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Background({ header, children, footer }: typesProps) {
  return (
    <div className="w-full min-h-screen bg-[#101622] flex flex-col justify-between items-center">
      <div className="w-full">{header}</div>
      <div className="max-w-7xl text-center">{children}</div>
      <div className="w-full">{footer}</div>
    </div>
  );
}

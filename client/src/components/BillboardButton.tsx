import { PlayIcon } from '@heroicons/react/24/solid';

type Props = {
  text: string;
  // icon: React.ForwardRefExoticComponent<
  //   Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
  //     title?: string | undefined;
  //     titleId?: string | undefined;
  //   } & React.RefAttributes<SVGSVGElement>
  // >;
  theme: 'light' | 'dark';
};

const BillboardButton = ({ text, theme }: Props) => {
  return (
    <button
      className={`${
        theme === 'dark' ? 'bg-opacity-30' : null
      } bg-white rounded-md py-2 px-4 w-auto text-large font-semibold flex items-center hover:bg-neutral-400 transition`}
    >
      <PlayIcon
        className={`w-7 ${theme === 'light' ? null : 'text-white'} mr-1`}
      />
      {/* {icon} */}
      <p className={theme === 'light' ? 'text-back' : 'text-white'}>{text}</p>
    </button>
  );
};

export default BillboardButton;

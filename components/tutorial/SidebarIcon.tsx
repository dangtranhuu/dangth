import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import * as HiIcons from 'react-icons/hi'
import * as RiIcons from 'react-icons/ri'
import * as TbIcons from 'react-icons/tb'
import { IconType } from 'react-icons'
import * as ALtIcons from "react-icons/fa6";
import * as GiIcons from "react-icons/gi";
import * as DiIcons from "react-icons/di";

const ICON_PACKS: Record<string, Record<string, IconType>> = {
  Fa: FaIcons,
  Md: MdIcons,
  Ai: AiIcons,
  Bi: BiIcons,
  Hi: HiIcons,
  Ri: RiIcons,
  Tb: TbIcons,
  Alt: ALtIcons,
  Gi: GiIcons,
  Di: DiIcons
}

interface Props {
  icon?: string
}

export const SidebarIcon = ({ icon }: Props) => {
  if (!icon) return <span className="w-4" />

  const prefix = icon.slice(0, 2)
  const IconPack = ICON_PACKS[prefix]
  const IconComponent = IconPack?.[icon]

  if (!IconComponent) return <span className="w-4" />

  const ResolvedIcon = IconComponent as IconType

  return <ResolvedIcon className="w-4 h-4" />
}

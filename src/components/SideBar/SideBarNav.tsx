import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiGitMergeLine, RiInputMethodLine, RiUserAddLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarNav() {
  return (
    <Stack spacing='12' align='flex-start'>
        
      <NavSection  title='GERAL'>
        <NavLink icon={RiDashboardLine} href='/dashboard'>DashBoard</NavLink>
        <NavLink icon={RiUserAddLine} href='/users'>Usuários</NavLink>
      </NavSection>

      <NavSection title='AUTOMAÇÃO'>
        <NavLink icon={RiInputMethodLine} href='/forms'>Formulários</NavLink>
        <NavLink icon={RiGitMergeLine} href='/automation'>Automação</NavLink>
      </NavSection>
        
      </Stack>
  )
}
import { Link as ChakraLink, Text, Icon, LinkProps as ChakraLinkProps} from "@chakra-ui/react";
import { ElementType } from "react";

import { ActiveLink } from "../ActiveLink";

interface NavLinkprops extends ChakraLinkProps {
  children: string;
  icon: ElementType;
  href: string;
}

export function NavLink({ children, icon,href , ...rest }: NavLinkprops) {
  return (
  <ActiveLink href={href} passHref shouldMatchExactHref={true}>
    <ChakraLink display='flex' align='center' {...rest}>
      <Icon as={icon} fontSize='20' />
      <Text ml='4' fontWeight='medium'>{children}</Text>
    </ChakraLink>
  </ActiveLink>
  );
}
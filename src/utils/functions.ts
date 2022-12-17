import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
export const getQuery = () => {
  const pathname = usePathname();
  pathname!.toString();
  return pathname!.slice(1).split('/');
};

export function SwalMessageSiteCreate () {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: "Created Site",
    showConfirmButton: false,
    timer: 1000,
  })
}
export function SwalMessageSiteCreateError (message: string) {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    footer: '<a href="">Why do I have this issue?</a>',
  });
}
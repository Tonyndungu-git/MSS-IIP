import Link from "next/link";
import { usePathname } from "next/navigation";


export default function NavigationItem({
    href,
    label
}:{
    href:string;
    label:string;
}){

    const pathname = usePathname();

    const active = pathname === href;


    return (

        <Link
            href={href}
            className={`
            block
            px-4
            py-3
            rounded-lg
            transition
            ${
                active
                ?
                "bg-cyan-500/20 text-cyan-400"
                :
                "text-slate-400 hover:bg-slate-800 hover:text-white"
            }
            `}
        >

            {label}

        </Link>

    );

}
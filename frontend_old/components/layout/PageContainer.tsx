export default function PageContainer({

children

}:{

children:React.ReactNode;

}){


return (

<main

className="
ml-72
min-h-screen
bg-slate-950
text-white
"

>


<div

className="
p-8
"

>

{children}

</div>


</main>

)

}
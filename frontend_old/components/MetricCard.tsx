interface Props{

title:string;

value:string;

unit?:string;

}


export default function MetricCard(
{
title,
value,
unit
}:Props
){

return (

<div className="
bg-white
rounded-xl
shadow
p-5
">

<p className="
text-gray-500
text-sm
">
{title}
</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{value}

<span className="
text-base
ml-1
text-gray-500
">

{unit}

</span>

</h2>


</div>

)

}
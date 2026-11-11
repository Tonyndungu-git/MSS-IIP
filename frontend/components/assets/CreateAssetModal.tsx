'use client';

import React, { useEffect, useState } from 'react';
import { api, CreateAssetInput } from '@/lib/api';

import {
  Organization,
  Site
} from '@/types';

import {
  X,
  Plus,
  AlertCircle,
  CheckCircle2,
  Loader2,
  HardDrive
} from 'lucide-react';



interface CreateAssetModalProps {

  isOpen: boolean;

  onClose: () => void;

  onSuccess: () => void;

  organizations: Organization[];

  sites: Site[];

}




export const CreateAssetModal: React.FC<CreateAssetModalProps> = ({

  isOpen,

  onClose,

  onSuccess,

  organizations,

  sites,

}) => {



const [formData,setFormData] =
useState<CreateAssetInput>({

  name:"",

  asset_type:"BATTERY",

  manufacturer:"",

  model:"",

  serial_number:"",

  organization_id:"",

  site_id:"",

  gateway_id:null

});





const [loading,setLoading]=useState(false);

const [error,setError]=useState<string | null>(null);

const [success,setSuccess]=useState(false);





/*
Initialize tenant and site
only when real data exists
*/

useEffect(()=>{


if(
organizations.length > 0 &&
!formData.organization_id
){

setFormData(prev=>({

...prev,

organization_id:
organizations[0].id

}));

}



if(
sites.length > 0 &&
!formData.site_id
){

setFormData(prev=>({

...prev,

site_id:
sites[0].id

}));

}


},[
organizations,
sites
]);







if(!isOpen)
return null;








const handleSubmit = async(
e:React.FormEvent
)=>{


e.preventDefault();


if(!formData.site_id){

setError(
"No physical site selected. Please create a site first."
);

return;

}



setLoading(true);

setError(null);



try{


await api.createAsset(
formData
);



setSuccess(true);



setTimeout(()=>{


setSuccess(false);

onSuccess();

onClose();


},1200);



}
catch(err:any){


setError(
err.message ||
"Failed registering asset"
);


}
finally{


setLoading(false);


}



};








return (

<div
className="
fixed
inset-0
z-50
flex
items-center
justify-center
p-4
bg-black/80
backdrop-blur-sm
"
>


<div
className="
w-full
max-w-lg
bg-[#070e1e]
border
border-slate-700
rounded-lg
shadow-2xl
overflow-hidden
"
>



<div
className="
flex
justify-between
items-center
p-4
border-b
border-slate-800
bg-[#0a1224]
"
>


<div
className="
flex
gap-2
items-center
"
>

<div
className="
p-2
rounded
bg-cyan-500/10
text-cyan-400
"
>

<HardDrive
className="
w-4
h-4
"
/>

</div>


<div>

<h3
className="
text-sm
font-bold
text-white
"
>

Register Infrastructure Asset

</h3>


<p
className="
text-xs
text-slate-400
font-mono
"
>

Write to MSS asset registry

</p>


</div>


</div>




<button
onClick={onClose}
>

<X
className="
w-4
h-4
text-slate-400
"
/>

</button>



</div>









<form
onSubmit={handleSubmit}
className="
p-5
space-y-4
"
>





{
error &&

<div
className="
p-3
rounded
bg-rose-950/50
border
border-rose-800
text-rose-300
text-xs
flex
gap-2
"
>

<AlertCircle
className="
w-4
h-4
"
/>

{error}

</div>

}







{
success &&

<div
className="
p-3
rounded
bg-emerald-950/50
border
border-emerald-800
text-emerald-300
text-xs
flex
gap-2
"
>

<CheckCircle2
className="
w-4
h-4
"
/>

Asset registered successfully

</div>

}










<input

required

placeholder="Asset name"

value={
formData.name
}

onChange={
e=>
setFormData({

...formData,

name:e.target.value

})

}

className="
w-full
bg-slate-900
border
border-slate-800
rounded
px-3
py-2
text-xs
text-white
"

/>










<select

value={
formData.asset_type
}

onChange={
e=>
setFormData({

...formData,

asset_type:e.target.value

})

}

className="
w-full
bg-slate-900
border
border-slate-800
rounded
px-3
py-2
text-xs
text-white
"

>


<option value="BATTERY">
BATTERY
</option>

<option value="CHARGER">
CHARGER
</option>

<option value="INVERTER">
INVERTER
</option>

<option value="TRANSFORMER">
TRANSFORMER
</option>

<option value="MOTOR">
MOTOR
</option>

<option value="PUMP">
PUMP
</option>

<option value="SENSOR_GATEWAY">
SENSOR GATEWAY
</option>

<option value="SOLAR_ARRAY">
SOLAR ARRAY
</option>


</select>










<input

required

placeholder="Manufacturer"

value={
formData.manufacturer
}

onChange={
e=>
setFormData({

...formData,

manufacturer:e.target.value

})

}

className="
w-full
bg-slate-900
border
border-slate-800
rounded
px-3
py-2
text-xs
text-white
"

/>







<input

required

placeholder="Model"

value={
formData.model
}

onChange={
e=>
setFormData({

...formData,

model:e.target.value

})

}

className="
w-full
bg-slate-900
border
border-slate-800
rounded
px-3
py-2
text-xs
text-white
"

/>








<input

required

placeholder="Serial number"

value={
formData.serial_number
}

onChange={
e=>
setFormData({

...formData,

serial_number:e.target.value

})

}

className="
w-full
bg-slate-900
border
border-slate-800
rounded
px-3
py-2
text-xs
text-white
"

/>











<select

value={
formData.organization_id
}

onChange={
e=>
setFormData({

...formData,

organization_id:e.target.value

})

}

className="
w-full
bg-slate-900
border
border-slate-800
rounded
px-3
py-2
text-xs
text-white
"

>


{
organizations.map(org=>(

<option
key={org.id}
value={org.id}
>

{org.name}

</option>

))

}


</select>









<select

value={
formData.site_id
}

onChange={
e=>
setFormData({

...formData,

site_id:e.target.value

})

}

className="
w-full
bg-slate-900
border
border-slate-800
rounded
px-3
py-2
text-xs
text-white
"

>


<option value="">
Select physical site
</option>


{
sites.map(site=>(

<option
key={site.id}
value={site.id}
>

{site.name}

</option>

))

}


</select>









<div
className="
flex
justify-end
gap-2
border-t
border-slate-800
pt-4
"
>


<button

type="button"

onClick={onClose}

className="
px-4
py-2
text-xs
text-slate-400
border
border-slate-800
rounded
"

>

Cancel

</button>





<button

disabled={loading}

className="
px-4
py-2
bg-cyan-400
text-black
rounded
text-xs
font-bold
flex
gap-2
items-center
"

>


{
loading

?

<>

<Loader2
className="
w-3
h-3
animate-spin
"
/>

Registering

</>

:

<>

<Plus
className="
w-3
h-3
"
/>

Register Asset

</>

}


</button>



</div>






</form>



</div>


</div>


);


};
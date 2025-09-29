import axios from 'axios';
import Swal from 'sweetalert2';

export const addItem = (endpoint,headers,formData)=>{
    axios.post(endpoint,formData, headers )
    .then(res=>{
        if (res.status===200 || res.status===201) {
            Swal.fire({
                title: "Yeni məlumat uğurla əlavə edildi.",
                icon: "success",
                confirmButtonText: "Yenilə"
            }).then((result) => {
              if (result.isConfirmed) {
                window.history.back();
              }
            });
        }else{
            Swal.fire({
                title: "Xəta!",
                text: "Təssüff ki, məlumatı əlavə etmək mümkün olmadı. Zəhmət olmasa bir daha cəhd edin.",
                icon: "error"
              });
        }
    })
    .catch(err=>{
        Swal.fire({
            title: "Xəta!",
            text: "Təssüff ki, məlumatı əlavə etmək mümkün olmadı. Zəhmət olmasa bir daha cəhd edin.",
            icon: "error"
          });
        console.log(err);
    })
}
